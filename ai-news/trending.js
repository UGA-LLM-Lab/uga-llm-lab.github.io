/**
 * AI News attention panel
 *
 * An index of 100 means that a topic's share of sampled Hugging Face
 * Daily Papers recommendations was unchanged from the previous week.
 * Topics without enough observations for a stable comparison are omitted.
 */
window.AI_NEWS_TRENDS = {
  title: "Research Attention",
  period: "September 21–27, 2026",
  comparison: "Compared with September 14–20",
  updated: "September 28, 2026",
  note: "Relative topic attention across 140 unique Hugging Face Daily Papers recommendations. Baseline = 100; topics may overlap.",
  items: [
    { label: "Robotics & world models", index: 172, share: 15.7, direction: "up" },
    { label: "Evaluation & verification", index: 144, share: 14.3, direction: "up" },
    { label: "Speech & audio", index: 131, share: 5.0, direction: "up" },
    { label: "Memory & context", index: 129, share: 7.9, direction: "up" },
    { label: "Agents & tool use", index: 122, share: 27.9, direction: "up" },
    { label: "Vision & multimodality", index: 116, share: 22.1, direction: "up" },
    { label: "Efficiency & inference systems", index: 94, share: 12.9, direction: "down" },
    { label: "Reasoning & mathematics", index: 68, share: 5.7, direction: "down" }
  ]
};

window.AI_NEWS_WEEKLY_FEATURE = {
  analysisId: "2026-09-21-to-2026-09-27",
  title: "Agents, Infrastructure, and Reliability",
  summary: "Agents moved into persistent workflows, but product incidents exposed reliability gaps. Research attention shifted toward robotics and evaluation, while infrastructure announcements focused on power, cooling, and capacity.",
  coverAlt: "UGA LLM Lab weekly graphic summarizing developments in agents, infrastructure, scientific AI, and robotics",
  metrics: [
    { value: "140", label: "papers sampled" },
    { value: "172", label: "robotics attention index" },
    { value: "144", label: "evaluation attention index" }
  ]
};
