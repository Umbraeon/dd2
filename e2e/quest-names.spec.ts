import { test, expect } from '@playwright/test';
import { PHASES } from '../src/data/roadmapData';

test('59-name index appears under related milestones, distinguishes proof and does not change progress', async ({ page }) => {
  const m02 = PHASES.flatMap(phase => phase.events).find(event => event.id === 'm02');
  if (!m02) throw Error('m02 not found');
  for (const [width, height] of [[390, 844], [1440, 900]] as const) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await page.getByRole('button', { name: `Consultar atividade: ${m02.title}` }).click();
    const details = page.locator('.quest-related-names');
    await expect(details).toBeVisible();
    await expect(details).not.toHaveAttribute('open', '');
    await details.locator('summary').click();
    await expect(details).toHaveAttribute('open', '');
    await expect(details).toContainText('Provações de um Novo Recruta');
    await expect(details).toContainText('Ordeals of a New Recruit');
    await expect(details).toContainText('Um Fornecedor em Apuros');
    await expect(details).toContainText('Amostra PAK reportada');
    await expect(details).toContainText('Base EN/PT-BR pareada');
    const sizing = await page.evaluate(() => ({
      windowWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      saved: localStorage.getItem('dd2_roadmap_user_progress_v3')
    }));
    expect(sizing.scrollWidth).toBeLessThanOrEqual(sizing.windowWidth + 1);
    expect(sizing.saved).toBeNull();
    await page.screenshot({ path: `test-results/quest-names-${width}x${height}.png` });
  }
});
