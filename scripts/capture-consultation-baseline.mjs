import { PHASES } from '../src/data/roadmapData.ts';
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const browser = await chromium.launch({ headless:true });
mkdirSync('test-results/screenshots', {recursive:true});
const screens = [[375,812],[390,844],[1440,900],[1920,1080]];
const origin = process.env.BASELINE_URL ?? 'http://127.0.0.1:3001';

for (const [width,height] of screens) {
  const page = await browser.newPage({viewport:{width,height}});
  const path = label => 'test-results/screenshots/pr-b-before-' + label + '-' + width + 'x' + height + '.png';
  const capture = async label => {
    await page.screenshot({path:path(label),fullPage:false});
  };
  await page.goto(origin);
  await page.getByRole('button',{name:'Consulta e ferramentas'}).click();
  await capture('entry');

  const chapter = page.getByRole('combobox',{name:'Capítulo do roteiro'});
  await chapter.selectOption('melve');
  await page.locator('.codex-chapter').first().scrollIntoViewIfNeeded();
  await capture('missions');

  await page.getByRole('button',{name:/Mostrar fichas e requisitos/}).first().click();
  await page.locator('.codex-achievement').first().scrollIntoViewIfNeeded();
  await capture('achievements');

  await page.locator('.codex-editorial-note button').click();
  await capture('references');
  await page.getByRole('button',{name:'Fechar'}).first().click();

  const search = page.getByRole('textbox',{name:'Buscar no roteiro e nas conquistas'});
  await search.fill('conquista');
  await page.locator('.codex-search-index').scrollIntoViewIfNeeded();
  await capture('global-search');
  await search.fill('termo-sem-resultados-999');
  await page.locator('.codex-search-index').scrollIntoViewIfNeeded();
  await capture('empty');
  await search.fill('');
  await chapter.selectOption('preend');
  await page.locator('.codex-chapter').scrollIntoViewIfNeeded();
  await capture('critical');

  await page.goto(origin);
  const first = PHASES.flatMap(phase => phase.events
    .filter(event => event.achievements.length > 0)
    .map(event => ({phase,event})))[0];
  await page.getByRole('combobox',{name:'Capítulo'}).selectOption(first.phase.id);
  await page.getByRole('button',{name:'Consultar atividade: '+first.event.title,exact:false}).click();
  await page.getByRole('region',{name:'Conquistas associadas no roteiro'})
    .getByRole('button',{name:/Abrir ficha da conquista/}).first().click();
  await page.locator('.codex-achievement').first().scrollIntoViewIfNeeded();
  await capture('achievement-from-diary-flow');
  await page.close();
}
await browser.close();
