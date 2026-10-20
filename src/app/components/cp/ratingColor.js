// Maps a competitive-programming rating to the color band competitive
// programmers already recognize from Codeforces. Keeping this real (rather
// than inventing a generic "level 1/2/3" system) is what makes the badge feel
// native to the domain instead of decorative.

export function getRatingTier(rating) {
  if (rating >= 2400) return { label: "Grandmaster", color: "#ff2d2d" };
  if (rating >= 2100) return { label: "Master", color: "#ff8c00" };
  if (rating >= 1900) return { label: "Candidate Master", color: "#aa00aa" };
  if (rating >= 1600) return { label: "Expert", color: "#2b7fff" };
  if (rating >= 1400) return { label: "Specialist", color: "#03a89e" };
  if (rating >= 1200) return { label: "Pupil", color: "#3bb143" };
  return { label: "Newbie", color: "#8a8a8a" };
}