// SAMPLE DATA: replace with your real events.
// - "image" is used as the card's media. If "video" is also set, the
//   video plays instead (muted, looping) with "image" as its poster.
// - "date" must be an ISO date ("YYYY-MM-DD") so the timeline can sort
//   events and tell past events from upcoming ones automatically.
// - "link" and "location" are optional; leave them out if not needed.

export const EVENTS = [
  {
    id: "welcome-bash",
    title: "CP Domain Welcome Bash",
    date: "2026-08-10",
    tags: ["Orientation", "Freshers"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    location: "LHC 101, IIT Indore",
    description:
      "The first meetup of the year for anyone curious about competitive programming. We walked through what the domain does across the year, how contests and ratings work, and how to get started even with zero prior experience. Senior members shared their own journeys from Newbie to Expert and beyond, and answered questions about time management alongside coursework. The evening ended with a short live-coding demo solving a Div. 3 problem from scratch, followed by snacks and informal one-on-one guidance for anyone unsure where to begin.",
  },
  {
    id: "cf-sprint-1",
    title: "Codeforces Sprint #1",
    date: "2026-09-05",
    tags: ["Contest", "Div. 3"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    location: "Online, Codeforces",
    link: "https://codeforces.com/contests",
    description:
      "Our first rated practice round of the semester, run in the style of a Codeforces Div. 3 contest with five problems of increasing difficulty. Members competed individually under real contest conditions, and the leaderboard was projected live in the CS lab for anyone watching in person. Right after the round ended, two of our top performers walked through their approaches to the harder problems on the whiteboard, and we discussed common mistakes people made under time pressure, from overengineering solutions to misreading constraints.",
  },
  {
    id: "dp-workshop",
    title: "Dynamic Programming Workshop",
    date: "2026-09-27",
    tags: ["Workshop", "DP"],
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    image: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&q=80",
    location: "LHC 101, IIT Indore",
    description:
      "A hands-on session dedicated entirely to dynamic programming, the topic most members ask about. We built intuition from first principles: starting with simple recursion, adding memoisation, and finally converting to clean iterative solutions. Live coding covered classic patterns including knapsack, longest increasing subsequence, and digit DP, with participants solving a problem after each pattern was introduced. The workshop was recorded for anyone who could not attend live, and the slides and code from the session are linked in our resources.",
  },
  {
    id: "icpc-mock",
    title: "ICPC-Style Team Mock",
    date: "2026-10-18",
    tags: ["Team Contest", "ICPC"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    location: "CS Lab 2, IIT Indore",
    description:
      "Teams of three shared a single computer to solve as many problems as possible in three hours, exactly like the real ICPC format. This event is about more than solving problems individually: it tests communication, task division and staying calm when the shared machine becomes a bottleneck. We printed a leaderboard-style scoreboard every thirty minutes so teams could track their standing, and the top three teams presented their strategy afterward, covering how they split problems and when they chose to switch tasks under pressure.",
  },
  {
    id: "winter-camp",
    title: "Winter Training Camp",
    date: "2026-12-12",
    tags: ["Camp", "All Levels"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    location: "LHC 101, IIT Indore",
    description:
      "A five-day intensive camp held during the winter break, structured around a different topic each day: graphs, number theory, segment trees, greedy and game theory, finishing with a full mock contest. Sessions run in the morning, with the afternoons kept for solving a curated problem set for that day's topic under the supervision of senior members. This camp is aimed at members who want to make a focused jump in rating before the semester's contest season picks up again in the new year.",
  },
];