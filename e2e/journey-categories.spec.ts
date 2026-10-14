import { test, expect } from '@playwright/test';
import { PHASES } from '../src/data/roadmapData';

const key = 'dd2_roadmap_user_progress_v3';
const byId = (id: string) => PHASES.flatMap(p => p.events.map(event => ({ phase: p, event })))
  .find(x => x.event.id === id)!;

test('diário conserva categorias nas atividades sem exibir a legenda global poluída', async ({ page }) => {
  for (const [width, height] of [[390, 844], [1440, 900]]) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await expect(page.getByLabel('Legenda: tipos de etapas')).toHaveCount(0);
    await expect(page.locator('.quest-master-controls .journey-kind')).toHaveCount(0);

    for (const id of ['m09', 'v112', 'v303', 'p08', 'b12']) {
      const item = byId(id);
      await page.getByRole('combobox', { name: 'Capítulo' }).selectOption(item.phase.id);
      const row = page.getByRole('button', { name: `Consultar atividade: ${item.event.title}` });
      await expect(row).toBeVisible();
      const category = id === 'm09' || id === 'p08' ? 'during'
        : id === 'v303' ? 'point_of_no_return' : 'side';
      await expect(row.locator('[data-journey-category]')).toHaveAttribute('data-journey-category', category);
      await expect(row.locator('.journey-kind')).toHaveCount(1);
      await expect(row.locator('[data-journey-risk]')).toHaveCount(0);
      await row.click();
      const detail = page.locator('.quest-detail');
      await expect(detail.locator('[data-journey-category]')).toHaveText(
        category === 'during' ? 'Durante esta missão'
          : category === 'point_of_no_return' ? 'Ponto sem retorno' : 'Missão secundária'
      );
      if (id === 'm09') await expect(detail).toContainText('No Rastro do Dragão');
      if (id === 'p08') await expect(detail).toContainText('Gigantus');
      if (width < 600) await page.getByRole('button', { name: 'Voltar à lista de missões' }).click();
    }

    const timed = byId('v302');
    await page.getByRole('combobox', { name: 'Capítulo' }).selectOption(timed.phase.id);
    const timedRow = page.getByRole('button', { name: `Consultar atividade: ${timed.event.title}` });
    await expect(timedRow.locator('.journey-risk-indicator')).toHaveAttribute('aria-label', 'Prazo após gatilho e perdível');
    await timedRow.click();
    await expect(page.locator('.quest-detail [data-journey-risk="timed"]')).toHaveText('Prazo após gatilho');
    await expect(page.locator('.quest-detail [data-journey-risk="timed"]')).toHaveAttribute('title', /aceitar ajudar Wilhelmina/);
    await expect(page.locator('.quest-detail [data-journey-risk="missable"]')).toHaveText('Perdível');
    if (width < 600) await page.getByRole('button', { name: 'Voltar à lista de missões' }).click();

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(overflow).toBe(false);
    expect(await page.evaluate(k => localStorage.getItem(k), key)).toBeNull();
  }
});

test('Consulta mantém tipos por atividade, mas sem parede de etiquetas no cabeçalho', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Consulta e ferramentas' }).click();
  await page.getByRole('button', { name: 'Missões', exact: true }).click();

  await expect(page.getByLabel('Legenda: tipos de etapas')).toHaveCount(0);
  await expect(page.getByText('72 marcos · 9 capítulos')).toBeVisible();
  const first = page.locator('.codex-step').first();
  await expect(first.locator('[data-journey-category]')).toBeVisible();
  await expect(first.locator('.journey-kind')).toHaveCount(1);
  await expect(page.locator('.consultation .journey-kind-legend')).toHaveCount(0);
  expect(await page.evaluate(k => localStorage.getItem(k), key)).toBeNull();
});
