/**
 * AI News attention panel
 *
 * An index of 100 means that a topic's share of sampled Hugging Face
 * Daily Papers recommendations was unchanged from the previous week.
 * Topics without enough observations for a stable comparison are omitted.
 */
window.AI_NEWS_TRENDS = {
  title: "Research Attention",
  period: "September 14–20, 2026",
  comparison: "Compared with September 7–13",
  updated: "September 21, 2026",
  note: "Relative topic attention across 131 unique Hugging Face Daily Papers recommendations. Baseline = 100; topics may overlap.",
  items: [
    { label: "Self-improvement & evolution", index: 143, share: 6.9, direction: "up" },
    { label: "Robotics & world models", index: 122, share: 9.2, direction: "up" },
    { label: "Memory & context", index: 111, share: 6.1, direction: "up" },
    { label: "Agents & tool use", index: 108, share: 22.9, direction: "up" },
    { label: "Evaluation & verification", index: 103, share: 9.9, direction: "flat" },
    { label: "Efficiency & inference systems", index: 87, share: 13.7, direction: "down" },
    { label: "Reasoning & mathematics", index: 82, share: 8.4, direction: "down" },
    { label: "Vision & multimodality", index: 77, share: 19.1, direction: "down" },
    { label: "Speech & audio", index: 62, share: 3.8, direction: "down" }
  ]
};

window.AI_NEWS_WEEKLY_FEATURE = {
  analysisId: "2026-09-14-to-2026-09-20",
  title: "From model demonstrations to deployment stacks",
  summary: "This week, Google and Qwen released live multimodal updates, Figure tested robots in unfamiliar homes, agent products gained new safeguards, and infrastructure companies announced new funding and systems work. Evidence of broad and reliable business impact remains mixed.",
  coverAlt: "Editorial illustration connecting multimodal AI, robotics, model evaluation, and computing infrastructure",
  metrics: [
    { value: "131", label: "papers sampled" },
    { value: "143", label: "self-improvement index" },
    { value: "122", label: "robotics index" }
  ]
};
