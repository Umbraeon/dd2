import { test, expect } from '@playwright/test';
import { PHASES } from '../src/data/roadmapData';

test('nomes bilíngues úteis continuam nas instruções, sem expor a auditoria ao jogador', async ({ page }) => {
  const m02 = PHASES.flatMap(phase => phase.events).find(event => event.id === 'm02');
  if (!m02) throw Error('m02 not found');

  for (const [width, height] of [[390, 844], [1440, 900]] as const) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await page.getByRole('button', { name: `Consultar atividade: ${m02.title}`, exact: false }).click();
    const detail = page.locator('.quest-detail-body');
    await expect(detail).toContainText('Provações de um Novo Recruta');
    await expect(detail).toContainText('Ordeals of a New Recruit');
    await expect(detail).not.toContainText('Amostra PAK reportada');
    await expect(detail).not.toContainText('Base EN/PT-BR pareada');
    await expect(page.locator('.quest-related-names')).toHaveCount(0);

    const sizing = await page.evaluate(() => ({
      windowWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      saved: localStorage.getItem('dd2_roadmap_user_progress_v3')
    }));
    expect(sizing.scrollWidth).toBeLessThanOrEqual(sizing.windowWidth + 1);
    expect(sizing.saved).toBeNull();
  }
});
