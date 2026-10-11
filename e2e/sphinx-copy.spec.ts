import { test, expect } from '@playwright/test';

test('Esfinge: prazo só em Ruminação, outras recompensas continuam acessíveis', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Abrir central de ferramentas' }).click();
  await page.getByRole('button', { name: /^Esfinge/ }).click();

  await expect(page.getByText('Antes de responder')).toBeVisible();
  await expect(page.getByText(/Se errar, você perde a recompensa daquele enigma, mas pode continuar os demais/)).toBeVisible();
  await expect(page.getByText(/O prazo de sete dias se aplica à Ruminação/)).toBeVisible();
  await expect(page.getByText(/a Esfinge voará embora para sempre e os baús trancarão/i)).toHaveCount(0);
  await expect(page.getByText(/Atenção:/i)).toHaveCount(0);
  await expect(page.getByText(/Conte quantos baús de recompensa/)).toBeAttached();

  expect(await page.evaluate(() => localStorage.getItem('dd2_roadmap_user_progress_v3'))).toBeNull();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
});

test('Esfinge: orientação de combate final é curta e não confunde conquista com item', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Abrir central de ferramentas' }).click();
  await page.getByRole('button', { name: /^Esfinge/ }).click();
  await expect(page.getByText("Conquistas: 'Marcas completas' (#39) e 'Desprezo pelo ceifador' (#51)")).toBeVisible();
  await expect(page.getByText('Baú final: Pedra de Despertar Eterna')).toBeVisible();
  await expect(page.getByText(/Antes do último enigma, equipe a vocação Arqueiro/)).toBeVisible();
});
