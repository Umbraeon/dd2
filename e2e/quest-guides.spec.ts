import { test, expect } from '@playwright/test';

const savedKey = 'dd2_roadmap_user_progress_v3';
const openConsultation = async (page: import('@playwright/test').Page) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Consulta e ferramentas' }).click();
};

test('Consulta exibe plano de cópias com os dois destinatários corretos no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  await page.getByRole('button', { name: 'Guias e cópias' }).click();
  await expect(page.getByRole('heading', { name: 'O que falsificar — e quem recebe cada versão' })).toBeVisible();
  const items = page.locator('article');
  await expect(items).toHaveCount(8);
  const jadeite = items.filter({ hasText: 'Jadeite Orb' });
  await expect(jadeite).toContainText('Original → Everard');
  await expect(jadeite).toContainText('Cópia → Offulve');
  const grim = items.filter({ hasText: 'Fulminous Shield' });
  await expect(grim).toContainText('Trysha');
  await expect(grim).toContainText('Myrddin');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('busca global por Jadeite abre guia individual sem criar progresso', async ({ page }) => {
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('Jadeite');
  const results = page.getByRole('region', { name: 'Resultados encontrados' });
  await results.getByRole('button', { name: /Orbe de Jadeíta/ }).click();
  await expect(page.getByRole('button', { name: 'Guias e cópias' })).toHaveAttribute('aria-pressed', 'true');
  const guide = page.locator('details').filter({ hasText: /Orbe de Jadeíta.*Hunt for the Jadeite Orb/ }).first();
  await expect(guide).toHaveAttribute('open', '');
  await expect(guide).toContainText('Entregue o orbe autêntico a Everard');
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('Diário mostra passo a passo de Trysha e Myrddin sob demanda', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('combobox', { name: 'Capítulo' }).selectOption('melve');
  await page.getByRole('button', { name: /Consultar atividade: Conheça Beren/ }).click();
  const panel = page.getByRole('region', { name: 'Guias detalhados relacionados' });
  await expect(panel.locator('details')).toHaveCount(2);
  const trysha = panel.locator('details').filter({ hasText: /Magia Vertiginosa/ });
  await trysha.locator('summary').click();
  await expect(trysha).toContainText('pelo menos três grimórios autênticos');
  const myrddin = panel.locator('details').filter({ hasText: /O Julgamento do Feiticeiro/ });
  await myrddin.locator('summary').click();
  await expect(myrddin).toContainText('três falsificações diferentes');
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});


test('biblioteca: nova missão em Melve abre diretamente a ficha na busca global', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('A Tímida Bravura dos Irmãos');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /A Tímida Bravura dos Irmãos/ }).click();
  await expect(page.getByRole('button', { name: 'Guias e cópias' })).toHaveAttribute('aria-pressed', 'true');
  const details = page.locator('#quest-guide-brothers_brave');
  await expect(details).toHaveAttribute('open', '');
  await expect(details).toContainText('acompanhe os dois de volta até Melve');
  await expect(page.getByRole('heading', { name: 'O que falsificar — e quem recebe cada versão' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('Diário: mostra todos os percursos da Guilda sem duplicar passos de conclusão', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('combobox', { name: 'Capítulo' }).selectOption('vernworth1');
  await page.getByRole('button', { name: /Consultar atividade: Ative a Guilda/ }).click();
  const panel = page.getByRole('region', { name: 'Guias detalhados relacionados' });
  await expect(panel.locator('details')).toHaveCount(3);
  const vocation = panel.locator('details').filter({ hasText: /Frustração Vocacional/ });
  await vocation.locator('summary').click();
  await expect(vocation).toContainText('Two-Hander');
  await expect(vocation).toContainText('Grievous Horns');
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});
