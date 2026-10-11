import { test, expect } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { PHASES } from '../src/data/roadmapData';

test('orientações Bakbattahl aparecem em PT-BR sem mudar progresso desktop e mobile', async ({ page }) => {
  const phase = PHASES.find(x => x.id === 'battahl');
  if (!phase) throw Error('Capítulo battahl indisponível');
  const event = phase.events.find(x => x.id === 'b02');
  if (!event) throw Error('Marco b02 indisponível');
  mkdirSync('test-results/screenshots', { recursive: true });
  for (const [width,height] of [[390,844],[1440,900]]) {
    await page.setViewportSize({width,height});
    await page.goto('/');
    await page.getByRole('combobox',{name:'Capítulo'}).selectOption(phase.id);
    await page.getByRole('button',{name:`Consultar atividade: ${event.title}`}).click();
    const body=page.locator('.quest-objective');
    await expect(body).toContainText('Piedade entre Ladrões');
    await expect(body).toContainText('Orações Ensombradas');
    await expect(body).toContainText('Uma Proposta Venenosa');
    await expect(body).toContainText('Mercy among Thieves');
    expect(await page.evaluate(() => localStorage.getItem('dd2_roadmap_user_progress_v3'))).toBeNull();
    const dims=await page.evaluate(() => [document.documentElement.scrollWidth,document.documentElement.clientWidth]);
    expect(dims[0]).toBeLessThanOrEqual(dims[1]+1);
    await page.screenshot({path:`test-results/screenshots/localized-quests-${width}x${height}.png`});
  }
});
