import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync } from 'node:fs';
import { PHASES } from '../src/data/roadmapData';

const key = 'dd2_roadmap_user_progress_v3';
const all = PHASES.flatMap(phase => phase.events.map(event => ({ phase, event })));
const firstLinked = all.find(item => item.event.achievements.length > 0)!;
const large = all.find(item => item.event.achievements.length === 12)!;

const readProgress = (page: Page) => page.evaluate(k => localStorage.getItem(k), key);

test('linked achievements use Steam art, named status and full catalogue card without saving', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.getByRole('combobox', { name: 'Capítulo' }).selectOption(firstLinked.phase.id);
  await page.getByRole('button', { name: new RegExp('Consultar atividade: ' + firstLinked.event.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) }).click();
  const region = page.getByRole('region', { name: 'Conquistas associadas no roteiro' });
  await expect(region).toContainText('em verificação');
  await expect(region).toContainText('não confirma o momento nem garante o desbloqueio');
  await expect(region.locator('.inline-achievement-entry')).toHaveCount(firstLinked.event.achievements.length);
  const item = region.getByRole('button', { name: /Abrir ficha da conquista/ }).first();
  await expect(item).toContainText('Não obtida');
  await expect(item.locator('img')).toHaveAttribute('src', /^https?:\/\//);
  expect(await readProgress(page)).toBeNull();
  await item.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#achievement-' + firstLinked.event.achievements[0])).toBeFocused();
  expect(await readProgress(page)).toBeNull();
});

test('achievement and milestone toggles remain independent, and v3 user state is retained', async ({ page }) => {
  const state = {
    version: '3.0.0', updatedAt: '2026-01-01T10:00:00.000Z',
    steps: {}, achievements: { [firstLinked.event.achievements[0]]: true },
    sphinx: {}, firstTokenLocation: '', seekerTokensCount: 7, barbecue: {},
    maisters: {}, confirmedCheckpoints: {}, extraLegacy: 'intact'
  };
  await page.addInitScript(({ key, state }) => {
    if (localStorage.getItem(key) === null) localStorage.setItem(key, JSON.stringify(state));
  }, { key, state });
  await page.goto('/');
  const region = page.getByRole('region', { name: 'Conquistas associadas no roteiro' });
  await expect(region.getByRole('button', { name: /Abrir ficha da conquista/ }).first()).toContainText('Obtida');
  await page.getByRole('button', { name: 'Concluir marco' }).click();
  let saved = JSON.parse((await readProgress(page))!);
  expect(saved.achievements[firstLinked.event.achievements[0]]).toBe(true);
  expect(saved.steps[firstLinked.event.id]).toBe(true);
  expect(saved.extraLegacy).toBe('intact');
  await region.getByRole('button', { name: /Abrir ficha da conquista/ }).first().click();
  await page.locator('#achievement-' + firstLinked.event.achievements[0]).getByRole('checkbox').uncheck();
  saved = JSON.parse((await readProgress(page))!);
  expect(saved.achievements[firstLinked.event.achievements[0]]).toBe(false);
  expect(saved.steps[firstLinked.event.id]).toBe(true);
});

test('12 linked cards start compact, reveal all on demand and never overflow in four viewports', async ({ page }) => {
  mkdirSync('test-results/screenshots', { recursive: true });
  for (const [width, height] of [[375, 812], [390, 844], [1440, 900], [1920, 1080]]) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await page.getByRole('combobox', { name: 'Capítulo' }).selectOption(large.phase.id);
    await page.getByRole('button', { name: 'Consultar atividade: ' + large.event.title, exact: false }).click();
    const region = page.getByRole('region', { name: 'Conquistas associadas no roteiro' });
    await expect(region.locator('.inline-achievement-entry')).toHaveCount(3);
    await expect(region.getByRole('button', { name: 'Ver mais 9 conquistas associadas' })).toBeVisible();
    await region.locator('.inline-achievement-entry').first().scrollIntoViewIfNeeded();
    await expect(region.locator('.inline-achievement-entry').first()).toBeInViewport();
    await page.screenshot({ path: `test-results/screenshots/pr-a-12-inline-${width}x${height}.png`, fullPage: false });
    await region.getByRole('button', { name: 'Ver mais 9 conquistas associadas' }).click();
    await expect(region.locator('.inline-achievement-entry')).toHaveCount(12);
    const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(hasOverflow).toBe(false);
    const minHeight = await region.getByRole('button', { name: /Abrir ficha da conquista/ }).first().evaluate(el => el.getBoundingClientRect().height);
    expect(minHeight).toBeGreaterThanOrEqual(44);
    await region.locator('.inline-achievement-entry').first().scrollIntoViewIfNeeded();
    await expect(region.locator('.inline-achievement-entry').first()).toBeInViewport();
    await page.screenshot({ path: `test-results/screenshots/pr-a-12-expanded-${width}x${height}.png`, fullPage: false });
  }
});

test('external Steam images blocked: compact layout uses accessible fallback', async ({ page }) => {
  await page.route('https://**/*', route => route.abort());
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Consultar atividade: ' + firstLinked.event.title, exact: false }).click();
  const region = page.getByRole('region', { name: 'Conquistas associadas no roteiro' });
  await expect(region.locator('.inline-achievement-fallback').first()).toBeVisible();
  await expect(region.getByText('Ícone indisponível').first()).toBeAttached();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  mkdirSync('test-results/screenshots', { recursive: true });
  await region.locator('.inline-achievement-fallback').first().scrollIntoViewIfNeeded();
  await expect(region.locator('.inline-achievement-fallback').first()).toBeInViewport();
  await page.screenshot({ path: 'test-results/screenshots/pr-a-fallback-mobile-390x844.png', fullPage: false });
  expect(await readProgress(page)).toBeNull();
});

test('inline icons and full-card navigation have no axe serious/critical findings on mobile', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Consultar atividade: ' + firstLinked.event.title, exact: false }).click();
  const region = page.getByRole('region', { name: 'Conquistas associadas no roteiro' });
  const button = region.getByRole('button', { name: /Abrir ficha da conquista/ }).first();
  await button.focus();
  await expect(button).toBeFocused();
  const report = await new AxeBuilder({ page }).include('.inline-achievements').analyze();
  await testInfo.attach('axe-pr-a-inline.json', {
    body: Buffer.from(JSON.stringify(report.violations, null, 2)), contentType: 'application/json'
  });
  expect(report.violations.filter(v => ['serious', 'critical'].includes(v.impact ?? ''))).toEqual([]);
});
