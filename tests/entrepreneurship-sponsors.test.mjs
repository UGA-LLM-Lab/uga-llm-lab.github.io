import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const contentSource = readFileSync(new URL("../assets/js/data.js", import.meta.url), "utf8");
const rendererSource = readFileSync(new URL("../assets/js/site.js", import.meta.url), "utf8");

function renderEntrepreneurship(updateContent = () => {}) {
  const mount = { innerHTML: "" };
  const context = {
    window: {},
    document: {
      querySelector: (selector) => selector === "[data-entrepreneurship-page]" ? mount : null,
      querySelectorAll: () => []
    }
  };
  vm.runInNewContext(contentSource, context);
  updateContent(context.window.LLM_LAB_DATA.entrepreneurship);
  vm.runInNewContext(rendererSource, context);
  return mount.innerHTML;
}

test("the entrepreneurship page gives both program sponsors a dedicated, linked logo section", () => {
  const html = renderEntrepreneurship();
  const section = html.match(/<section\b[^>]*aria-labelledby="entrepreneurship-sponsors-title"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.ok(section, "Program sponsors need their own labelled section, not just a paragraph.");

  const sponsors = [
    ["Franklin CREATE!", "https://www.franklin.uga.edu/franklin-create", "sponsor-franklin-create.png"],
    ["UGA College of Engineering", "https://engineering.uga.edu/", "sponsor-uga-engineering.svg"]
  ];
  for (const [name, url, image] of sponsors) {
    const link = [...section.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)]
      .find(([, attributes]) => attributes.includes(`href="${url}"`));
    assert.ok(link, `${name} should link to its official website.`);
    assert.ok(link[2].includes(`src="assets/images/${image}"`), `${name} needs its local logo.`);
    assert.ok(link[2].includes(`alt="${name} logo"`), `${name} needs descriptive image text.`);
    assert.ok(link[2].includes(name), `${name} needs a readable name alongside the image.`);
    assert.ok(readFileSync(new URL(`../assets/images/${image}`, import.meta.url)).length > 0);
  }
  assert.ok(html.indexOf(section) < html.indexOf('class="entrepreneurship-overview"'),
    "Sponsors should appear near the top, before the longer program overview.");
});

test("pages without program sponsors still render the entrepreneurship content", () => {
  const html = renderEntrepreneurship((page) => { delete page.sponsors; });
  assert.ok(!html.includes('id="entrepreneurship-sponsors-title"'));
  assert.ok(html.includes('id="entrepreneurship-overview-title"'));
  assert.ok(html.includes('id="student-ventures-title"'));
});
