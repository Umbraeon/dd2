import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const browser = await chromium.launch({headless:true});
mkdirSync('test-results/screenshots', {recursive:true});
const origin = process.env.BASELINE_URL ?? 'http://127.0.0.1:3001';

for (const [width,height] of [[375,812],[390,844],[1440,900],[1920,1080]]) {
  const page = await browser.newPage({viewport:{width,height}});
  const capture = async name => page.screenshot({
    path:'test-results/screenshots/pr-c-before-' + name + '-' + width + 'x' + height + '.png',
    fullPage:false
  });
  await page.goto(origin);
  await capture('header-closed');
  await page.getByRole('button',{name:'Abrir rastreador da Esfinge'}).click();
  await capture('old-tools-opens-sphinx');
  await page.locator('.fixed.inset-0.z-50 button[title="Fechar"]').first().click();
  await page.getByRole('button',{name:'Backup do progresso'}).click();
  await capture('backup-shortcut');
  await page.locator('.fixed.inset-0.z-50 button[title="Fechar"]').first().click();
  await page.getByRole('button',{name:'Consulta e ferramentas'}).click();
  await page.getByRole('navigation',{name:'Seções da Consulta'})
    .getByRole('button',{name:'Referências',exact:true}).click();
  await page.locator('.consult-tools button').first().scrollIntoViewIfNeeded();
  await capture('old-references-links');
  await page.close();
}
await browser.close();
