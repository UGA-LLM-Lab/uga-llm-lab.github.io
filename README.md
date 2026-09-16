# UGA LLM Lab Website

This repository hosts the official website of the UGA LLM Lab at the University of Georgia. Led by Professor Tianming Liu, our lab studies large language models, quantum AI, brain-inspired intelligence, and AI applications in biomedicine and education.

## Updating website content

Most website content, including news, members, publications, and opportunities, is maintained centrally in [`assets/js/data.js`](assets/js/data.js).

AI News uses a separate monthly archive so that articles do not require individual HTML files:

- Add each month's stories to `ai-news/YYYY-MM/data.js` and place their images in that month's `images` folder.
- Register a new month once in `ai-news/catalog.js`.
- Update the heat and research-attention panel in `ai-news/trending.js`.
- Daily reports and weekly analysis use the same article schema and are rendered by the shared `ai-news/news.js` file.
- A copyable generation specification for future AI-produced news packages is available in `ai-news/IMPORT_GUIDE.md`.

To propose an update:

1. Create a branch or fork of this repository.
2. Edit the relevant content file described above.
3. Preview the website locally and check your changes.
4. Open a pull request describing the update.

For changes outside the central data file, such as page structure, styling, or website functionality, please contact Siyuan Li on GitHub: [@liaoyanqing666](https://github.com/liaoyanqing666).
