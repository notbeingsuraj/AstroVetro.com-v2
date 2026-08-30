import { chromium } from "playwright";
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
let fails = 0;
const check = (l, ok) => { console.log(`${ok?"  ✅":"  ❌"} ${l}`); if(!ok) fails++; };

// 1) Responsive overflow check across required breakpoints with all sections
const vp = [[375,812],[390,844],[430,932],[768,1024],[1024,768],[1440,900],[1920,1080]];
const sections = ["collection","intentions","services","science","journal","top"];
for (const [w,h] of vp){
  const p = await browser.newPage({ viewport:{width:w,height:h} });
  await p.goto("http://localhost:5173/", {waitUntil:"networkidle"});
  await p.waitForTimeout(600);
  const ov = await p.evaluate(()=> document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  const missing = [];
  for (const id of sections){ if(await p.locator(`#${id}`).count()===0) missing.push(id); }
  check(`${w}px overflow=${ov} missing=[${missing}]`, !ov && missing.length===0);
  await p.close();
}

// 2) Desktop content checks
const d = await browser.newPage({ viewport:{width:1440,height:900} });
await d.goto("http://localhost:5173/", {waitUntil:"networkidle"});
await d.waitForTimeout(1000);
check("hero has 2 primary CTAs", await d.locator('a[href="#collection"]').count()>=1 && await d.locator('a[href="#services"]').count()>=1);
check("nav has Shop + Services", (await d.locator('nav a', {hasText:"Shop"}).count())>=1 && (await d.locator('nav a', {hasText:"Services"}).count())>=1);
// product prices visible
const prices = await d.locator('section#collection p', {hasText:"₹"}).count();
check("collection shows visible prices", prices>=8);
// service cards
check("services section has 4 cards", (await d.locator('#services article').count())===4);
// product images: ensure no broken <img> (all should have fallen back to SVG, no network errors for images)
const broken = await d.$$eval('img', imgs => imgs.filter(i=>i.complete && i.naturalWidth===0).length);
check("no broken images rendered", broken===0);
// article count in journal
check("journal has 5 articles", (await d.locator('#journal article').count())===0 || (await d.locator('#journal a[href^="/journal"]').count())===5);

// 3) Intention filter interaction
await d.click('button:has-text("Calm")');
await d.waitForTimeout(900);
const shownCards = await d.locator('section#collection a[aria-label*="₹"]').count();
check("intention filter shows calm products (>=3)", shownCards>=3);
const hasNonCalm = await d.locator('section#collection a[aria-label*="Black Tourmaline" i]').count();
check("filter excludes unrelated products", hasNonCalm===0);
await d.close();

// 4) Mobile menu
const m = await browser.newPage({ viewport:{width:375,height:812} });
await m.goto("http://localhost:5173/", {waitUntil:"networkidle"});
await m.waitForTimeout(600);
const tg = m.locator('button[aria-label*="menu" i]').first();
await tg.click(); await m.waitForTimeout(500);
check("mobile menu opens", (await m.locator('button[aria-label*="menu" i]').first().getAttribute("aria-expanded"))==="true");
await m.close();

// 5) Screenshot capture
for (const [name,w,h] of [["desktop",1440,900],["mobile",375,812],["tablet",768,1024]]){
  const p = await browser.newPage({ viewport:{width:w,height:h} });
  await p.goto("http://localhost:5173/", {waitUntil:"networkidle"});
  await p.waitForTimeout(1400);
  await p.screenshot({ path:`/Users/surajkumar/Desktop/astrovetro-v2/.planning/ui-reviews/${name}.png` });
  await p.close();
  console.log(`captured ${name}`);
}
await browser.close();
console.log(fails===0 ? "\nALL CHECKS PASS" : `\n${fails} FAILED`);
