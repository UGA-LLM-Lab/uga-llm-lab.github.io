# UGA LLM Lab website

A compact, multi-page academic lab website for GitHub Pages. It uses plain HTML, CSS, and JavaScript with no framework, dependencies, or build step.

## Local preview

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Where to edit content

Routine content lives in [`assets/js/data.js`](assets/js/data.js), organized into seven clearly labeled sections:

- `site`: lab name, sponsor, institutional links, designer credit, and contact information.
- `navigation`: top-level pages and the Opportunities submenu. A navigation record can use a text `label` or a `logo` image.
- `home`: the homepage summary and Mission items.
- `news`: add a record with date, category, title, and optional summary, image, and URL.
- `memberGroups`: add one member object to the appropriate group. Only `name` is required; missing photos use the shared placeholder.
- `researchAreas` and `publications`: research summaries and complete publication metadata. Publications include `year`, `month`, `monthNumber`, `authors`, `venue`, and optional `url`; the page automatically sorts each category newest first.
- `opportunities`: content, application instructions, email subjects, and action links for the four audience-specific opportunity pages.

Page-specific biography or product copy remains in the relevant HTML file so long-form content is easy to locate. The supplied Ambassador and Counselor Program page, including its embedded application form, is preserved directly as `ambassador-program-gform.html`; the audience pages link to it through their central data records.

## Shared code

- [`assets/js/site.js`](assets/js/site.js) renders the shared header, navigation, footer, and all data-driven lists.
- [`assets/css/styles.css`](assets/css/styles.css) contains the compact responsive visual system.
- Replacing `assets/images/lab-logo.svg` with a final square lab logo requires no code change.
- The transparent UGA mark is `assets/images/uga-logo-transparent.png`.
- The dark-background product wordmark is `assets/images/ezcollegeapp-wordmark-transparent.png`; the cropped blue navigation variant is `assets/images/ezcollegeapp-wordmark-nav.png`. Both display the required spelling `EZCollegeApp`.

## Adding a page

Copy an existing page shell, set a unique `<title>`, description, and `data-page`, then add its navigation record to `navigation` in `assets/js/data.js`. Shared header and footer markup is injected automatically.

## Deployment

Publish the repository root with GitHub Pages. All pages and assets use repository-relative paths, so the site works on organization Pages domains and project subpaths.
