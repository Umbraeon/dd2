import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

// Before state = main after PR C (no internal map action yet).
const origin=process.env.BASELINE_URL ?? 'http://127.0.0.1:3001';
const browser=await chromium.launch({headless:true});
mkdirSync('test-results/screenshots',{recursive:true});
for(const [width,height] of [[375,812],[390,844],[1440,900],[1920,1080]]){
  const page=await browser.newPage({viewport:{width,height}});
  await page.goto(origin);
  await page.getByRole('button',{name:'Abrir central de ferramentas'}).click();
  await page.getByRole('region',{name:'Central de Ferramentas'})
    .getByRole('button',{name:/^Mementos do Buscador/}).click();
  await page.screenshot({
    path:`test-results/screenshots/pr-d-before-tracker-${width}x${height}.png`,
    fullPage:false
  });
  await page.locator('.fixed.inset-0.z-50 a[href="https://mapgenie.io/dragons-dogma-2/maps/world"]')
    .scrollIntoViewIfNeeded();
  await page.screenshot({
    path:`test-results/screenshots/pr-d-before-external-access-${width}x${height}.png`,
    fullPage:false
  });
  await page.close();
}
await browser.close();
