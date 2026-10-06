/**
 * AI/SI News attention panel
 *
 * An index of 100 means that a topic's share of sampled Hugging Face
 * Daily Papers recommendations was unchanged from the previous week.
 * Topics without enough observations for a stable comparison are omitted.
 */
window.AI_NEWS_TRENDS = {
  title: "Research Attention",
  period: "September 28–October 4, 2026",
  comparison: "Compared with September 21–27",
  updated: "October 5, 2026",
  note: "Relative topic attention across 233 unique Hugging Face Daily Papers recommendations. Baseline = 100; topics may overlap.",
  items: [
    { label: "Efficiency & inference systems", index: 140, share: 18.0, direction: "up" },
    { label: "Vision & multimodality", index: 134, share: 29.6, direction: "up" },
    { label: "Reasoning & mathematics", index: 113, share: 6.4, direction: "up" },
    { label: "Agents & tool use", index: 88, share: 24.5, direction: "down" },
    { label: "Memory & context", index: 76, share: 6.0, direction: "down" },
    { label: "Evaluation & verification", index: 69, share: 9.9, direction: "down" },
    { label: "Robotics & embodied AI", index: 63, share: 9.9, direction: "down" },
    { label: "Coding & software", index: 60, share: 3.9, direction: "down" },
    { label: "Speech & audio", index: 52, share: 2.6, direction: "down" }
  ]
};

window.AI_NEWS_WEEKLY_FEATURE = {
  analysisId: "2026-09-28-to-2026-10-04",
  title: "New tools arrive; real-world evidence takes longer",
  summary: "Persistent agents, stronger models and new deployment controls reached users. A randomized field trial offered rare outcome evidence, while broad productivity and hiring effects remain unsettled.",
  coverAlt: "OpenAI’s official dots artwork, illustrating the week’s reporting on persistent AI agents",
  metrics: [
    { value: "233", label: "papers sampled" },
    { value: "140", label: "efficiency attention index" },
    { value: "134", label: "vision attention index" }
  ]
};
