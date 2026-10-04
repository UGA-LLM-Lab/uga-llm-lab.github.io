/**
 * AI/SI News month registry
 *
 * Add each new month here after creating ai-news/YYYY-MM/data.js.
 * The archive reads these month files on demand, 50 visible articles at a time.
 */
window.AI_NEWS_CATALOG = {
  weeklyAnalyses: [
    {
      id: "2026-09-21-to-2026-09-27",
      label: "September 21–27, 2026",
      data: "ai-news/weekly/2026-09-21-to-2026-09-27.json",
      reviewSlug: "weekly-ai-september-21-27",
      cover: "https://news.stanford.edu/__data/assets/image/0025/192733/20250409_Eric_Appel-7.jpg"
    },
    {
      id: "2026-09-14-to-2026-09-20",
      label: "September 14–20, 2026",
      data: "ai-news/weekly/2026-09-14-to-2026-09-20.json",
      reviewSlug: "weekly-ai-september-14-20",
      cover: "ai-news/2026-09/images/figure-helix-2-5-og.jpg"
    }
  ],
  months: [
    {
      id: "2026-10",
      label: "October 2026",
      data: "ai-news/2026-10/data.js"
    },
    {
      id: "2026-09",
      label: "September 2026",
      data: "ai-news/2026-09/data.js"
    }
  ]
};
