// Shared helpers for the members gallery.
// Safe to import on the server and in the browser (nothing client-only runs at import time).

/* ---------------------------------------------------------------------
   Codeforces ranks (title + colour), derived from the rating
   --------------------------------------------------------------------- */
export const UNRATED = { name: "Unrated", color: "#6ea2ff" };

const RANKS = [
  { min: 3000, name: "Legendary Grandmaster", color: "#ff3b4f" },
  { min: 2600, name: "International Grandmaster", color: "#ff3b3b" },
  { min: 2400, name: "Grandmaster", color: "#ff4d4d" },
  { min: 2300, name: "International Master", color: "#ff9a1f" },
  { min: 2100, name: "Master", color: "#ff9a1f" },
  { min: 1900, name: "Candidate Master", color: "#c05cff" },
  { min: 1600, name: "Expert", color: "#4d8dff" },
  { min: 1400, name: "Specialist", color: "#1fd1c1" },
  { min: 1200, name: "Pupil", color: "#3ddc6b" },
  { min: -Infinity, name: "Newbie", color: "#9aa4b5" },
];

export function getRank(rating) {
  if (typeof rating !== "number") return UNRATED;
  return RANKS.find((r) => rating >= r.min);
}

export function hexToRgba(hex, alpha) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/./g, "$&$&") : h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

/* ---------------------------------------------------------------------
   Reading the dataset
   Column names are matched loosely: "Email ID", "email_id" and "emailId"
   all work.
   --------------------------------------------------------------------- */
const ALIASES = {
  name: ["name", "fullname", "membername"],
  email: ["emailid", "email", "emailaddress", "gmail", "mail"],
  year: ["yearofstudy", "year", "studyyear"],
  skills: ["skills", "skill", "techstack"],
  github: ["githubid", "github", "githubusername", "githuburl"],
  instagram: ["instagramid", "instagram", "insta", "instagramusername"],
  linkedin: ["linkedin", "linkedinid", "linkedinurl", "linkedinprofile"],
  picture: ["profilepicture", "picture", "photo", "profilephoto", "image", "avatar"],
  joined: ["clubjoiningdate", "joiningdate", "joindate", "joined", "dateofjoining"],
  codeforces: ["codeforcesid", "codeforces", "cfid", "cfhandle", "codeforceshandle"],
};

const squash = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");

function pick(map, names) {
  for (const n of names) {
    const v = map[n];
    if (v !== undefined && v !== null && String(v).trim() !== "") return String(v).trim();
  }
  return "";
}

const isUrl = (v) => /^https?:\/\//i.test(v);
const bare = (v) => v.replace(/^@/, "").replace(/\/+$/, "");

// "octocat" -> https://github.com/octocat, full links are kept as they are
function profileLink(value, base) {
  if (!value) return null;
  if (isUrl(value)) return value;
  if (/^(www\.)?[\w-]+\.[a-z]{2,}\//i.test(value)) return `https://${value}`;
  return base + encodeURIComponent(bare(value));
}

function cfHandle(value) {
  if (!value) return "";
  const m = /profile\/([^/?#]+)/i.exec(value);
  return m ? decodeURIComponent(m[1]) : bare(value);
}

// Google Drive share links do not work inside <img>, so convert them.
export function resolvePicture(url) {
  if (!url) return "";
  const drive = /drive\.google\.com\/[^\s]*?(?:\/d\/|[?&]id=)([\w-]+)/.exec(url);
  if (drive) return `https://drive.google.com/thumbnail?id=${drive[1]}&sz=w600`;
  return url;
}

function formatYear(v) {
  if (!v) return "";
  if (/^\d$/.test(v)) {
    const n = Number(v);
    const suffix = n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
    return `${n}${suffix} Year`;
  }
  return v;
}

// Only ISO dates (2024-08-12) are reformatted. Anything else is shown as typed,
// because 12/08/2024 could mean two different dates.
function formatDate(v) {
  if (!v) return "";
  if (/^\d{4}-\d{2}-\d{2}/.test(v)) {
    const d = new Date(v);
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      });
    }
  }
  return v;
}

export function normalizeMember(row, index = 0) {
  const map = {};
  for (const [k, v] of Object.entries(row)) map[squash(k)] = v;

  const name = pick(map, ALIASES.name);
  const email = pick(map, ALIASES.email);
  const codeforcesId = cfHandle(pick(map, ALIASES.codeforces));

  return {
    id: `${index}-${squash(name) || "member"}`,
    name,
    email,
    year: formatYear(pick(map, ALIASES.year)),
    skills: pick(map, ALIASES.skills)
      .split(/[,;|\n]+/)
      .map((s) => s.trim())
      .filter(Boolean),
    joined: formatDate(pick(map, ALIASES.joined)),
    picture: resolvePicture(pick(map, ALIASES.picture)),
    codeforcesId,
    // only links whose value exists in the dataset are set
    links: {
      github: profileLink(pick(map, ALIASES.github), "https://github.com/"),
      instagram: profileLink(pick(map, ALIASES.instagram), "https://www.instagram.com/"),
      linkedin: profileLink(pick(map, ALIASES.linkedin), "https://www.linkedin.com/in/"),
      codeforces: codeforcesId
        ? `https://codeforces.com/profile/${encodeURIComponent(codeforcesId)}`
        : null,
      email: email ? `mailto:${email}` : null,
    },
  };
}

// Highest rating first. Unrated members go last, alphabetically.
export function sortByRating(members) {
  return [...members].sort((a, b) => {
    const ra = a.rating ?? -1;
    const rb = b.rating ?? -1;
    if (ra !== rb) return rb - ra;
    return a.name.localeCompare(b.name);
  });
}

/* ---------------------------------------------------------------------
   Codeforces API (call this on the server only)
   One request for all handles. If a handle does not exist, the API rejects
   the whole batch, so the bad handle is removed and the request is retried.
   --------------------------------------------------------------------- */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export async function fetchCodeforcesInfo(handles) {
  const found = new Map();
  let list = [...new Set(handles.map((h) => h.trim()).filter(Boolean))];

  for (let attempt = 0; attempt < 10 && list.length > 0; attempt++) {
    try {
      const url = `https://codeforces.com/api/user.info?handles=${list
        .map(encodeURIComponent)
        .join(";")}`;
      const res = await fetch(url, { next: { revalidate: 3600 } }); // cached for 1 hour
      const data = await res.json();

      if (data.status === "OK") {
        data.result.forEach((u) => found.set(u.handle.toLowerCase(), u));
        break;
      }

      const bad = /handle\s+(\S+)\s+not found/i.exec(data.comment || "");
      if (!bad) break; // some other failure: give up, members show as unrated
      list = list.filter((h) => h.toLowerCase() !== bad[1].toLowerCase());
      await wait(2100); // Codeforces allows about 1 request every 2 seconds
    } catch {
      break;
    }
  }
  return found;
}

export function cleanAvatar(user) {
  const a = user?.avatar || user?.titlePhoto;
  if (!a || /no-avatar|no-title/.test(a)) return "";
  return a.startsWith("//") ? `https:${a}` : a;
}