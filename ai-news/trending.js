/**
 * AI News attention panel
 *
 * Update this file independently of the monthly articles. An index of 100
 * means that a topic's share of the sampled papers was unchanged from the
 * previous comparison period. This is an editorial attention signal, not a
 * measure of adoption, revenue, or research quality.
 */
window.AI_NEWS_TRENDS = {
  title: "Research Attention",
  period: "September 7–13, 2026",
  comparison: "Compared with August 31–September 6",
  updated: "September 15, 2026",
  note: "Relative topic attention in Hugging Face Daily Papers recommendations. Baseline = 100.",
  items: [
    { label: "Reasoning & mathematics", index: 154, share: 10.3, direction: "up" },
    { label: "Robotics & world models", index: 124, share: 7.5, direction: "up" },
    { label: "Efficiency & inference systems", index: 104, share: 15.8, direction: "flat" },
    { label: "Agents & tool use", index: 100, share: 21.2, direction: "flat" },
    { label: "Vision & multimodality", index: 88, share: 24.7, direction: "down" },
    { label: "Self-improvement & evolution", index: 88, share: 4.8, direction: "down" },
    { label: "Safety & reliability", index: 75, share: 4.1, direction: "down" },
    { label: "Evaluation & verification", index: 72, share: 9.6, direction: "down" },
    { label: "Coding & software", index: 63, share: 3.4, direction: "down" },
    { label: "Memory & context", index: 60, share: 5.5, direction: "down" }
  ]
};
