// One-off screenshot capture using the locally installed Google Chrome
// (avoiding a large chromium download). Run with: node capture.mjs
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const browser = await chromium.launch({
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
];

mkdirSync(".capture", { recursive: true });

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
  // Give scroll-reveal animations a moment to settle
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `.capture/${vp.name}.png`, fullPage: false });
  await page.close();
  console.log(`Captured ${vp.name}`);
}

await browser.close();
console.log("Done");
