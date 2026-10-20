// Server component: reads the dataset, fetches Codeforces ratings,
// sorts by rating and hands the result to the client gallery.
// Do NOT add "use client" here, the data fetching runs on the server.

import CircularMembers from "./CircularMembers";
import { MEMBERS_RAW } from "./membersDataset";
import {
  cleanAvatar,
  fetchCodeforcesInfo,
  normalizeMember,
  sortByRating,
} from "./memberUtils";

export default async function MembersGallery() {
  const base = MEMBERS_RAW.map(normalizeMember).filter((m) => m.name);

  const cf = await fetchCodeforcesInfo(
    base.map((m) => m.codeforcesId).filter(Boolean)
  );

  const members = sortByRating(
    base.map((m) => {
      const user = m.codeforcesId ? cf.get(m.codeforcesId.toLowerCase()) : null;
      return {
        ...m,
        rating: typeof user?.rating === "number" ? user.rating : null,
        maxRating: typeof user?.maxRating === "number" ? user.maxRating : null,
        cfAvatar: cleanAvatar(user),
      };
    })
  );

  return (
    <section
      id="members"
      className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-8"
    >
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span
          className="mb-4 inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
          style={{
            color: "#8fd3ff",
            border: "1px solid rgba(47,107,255,0.28)",
            background: "rgba(47,107,255,0.10)",
          }}
        >
          Members
        </span>
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Meet the <span style={{ color: "#8fd3ff" }}>Coders</span>
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "#9db4de" }}>
          Ranked by their Codeforces rating. Click a card to see the full
          profile.
        </p>
      </div>

      <CircularMembers members={members} />
    </section>
  );
}