import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync, readFileSync } from 'node:fs';
import { PHASES } from '../src/data/roadmapData';

const key = 'dd2_roadmap_user_progress_v3';
const steps = PHASES.flatMap(phase => phase.events);
const original = () => ({
  version: '3.0.0',
  updatedAt: '2026-01-01T10:00:00.000Z',
  steps: {} as Record<string, boolean>, achievements: {} as Record<number, boolean>, sphinx: {}, firstTokenLocation: '',
  seekerTokensCount: 0, barbecue: {}, maisters: {}, confirmedCheckpoints: {}
});
async function seed(page: Page, state: ReturnType<typeof original>) {
  await page.addInitScript(({ key, state }: { key: string; state: ReturnType<typeof original> }) => {
    // A fixture must not overwrite the user's in-test edits on a real reload.
    if (localStorage.getItem(key) === null) localStorage.setItem(key, JSON.stringify(state));
  }, { key, state });
}

test('new player: first suggestion without changing localStorage, mobile/tablet/desktop real screenshots', async ({ page }) => {
  mkdirSync('test-results/screenshots', { recursive: true });
  for (const [width, height] of [[390, 844], [820, 1180], [1440, 900]]) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Retomar a jornada' })).toBeVisible();
    await expect(page.getByText('Sugestão do roteiro · não indica sua posição real')).toBeVisible();
    const sizes = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      width: innerWidth,
      header: document.querySelector('#resume-heading')?.getBoundingClientRect().top
    }));
    expect(sizes.scrollWidth).toBeLessThanOrEqual(sizes.width + 1);
    expect(sizes.header).toBeGreaterThanOrEqual(0);
    expect(sizes.header).toBeLessThan(height);
    await page.screenshot({ path: `test-results/screenshots/retomada-${width}x${height}.png`, fullPage: false });
  }
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBeNull();
  await page.reload();
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBeNull();
});

test('20/53: resume after reload and nonlinear selection does not complete earlier tasks', async ({ page }) => {
  const state = original();
  steps.slice(0, 20).forEach(event => { state.steps[event.id] = true; });
  await seed(page, state);
  await page.goto('/');
  await expect(page.getByText('Sugestão do roteiro · não indica sua posição real')).toBeVisible();
  await expect(page.getByRole('heading', { name: steps[20].title }).first()).toBeVisible();
  const later = steps[45];
  await page.locator('#resume-select').selectOption(later.id);
  await expect(page.getByText('Etapa escolhida por você')).toBeVisible();
  await page.reload();
  await expect(page.getByText('Etapa escolhida por você')).toBeVisible();
  const saved = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), key);
  expect(saved.activeStepId).toBe(later.id);
  expect(saved.steps[steps[20].id]).toBeUndefined();
  expect(saved.steps[steps[0].id]).toBe(true);
  expect(saved.steps[steps[44].id]).toBeUndefined();
});

test('postpone is not completion; deferred can be selected again; completion transition is explicit', async ({ page }) => {
  await page.goto('/');
  const first = steps[0].id;
  await page.getByRole('button', { name: 'Adiar sem concluir' }).click();
  let saved = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), key);
  expect(saved.steps[first]).toBeUndefined();
  expect(saved.deferredStepIds).toContain(first);
  await page.locator('#resume-select').selectOption(first);
  await expect(page.getByText('Etapa escolhida por você')).toBeVisible();
  saved = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), key);
  expect(saved.deferredStepIds).not.toContain(first);
  await page.getByRole('button', { name: 'Ver instruções completas' }).click();
  await expect(page.locator(`#step-${first}`)).toBeFocused();
  await page.locator(`#step-${first} button`).first().click();
  await expect(page.getByText('Etapa escolhida concluída')).toBeVisible();
  saved = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), key);
  expect(saved.activeStepId).toBe(first);
  await page.getByRole('button', { name: 'Ver sugestão do roteiro' }).click();
  await expect(page.getByText('Sugestão do roteiro · não indica sua posição real')).toBeVisible();
});

test('continue clears any filters hiding destination and sets focus to the exact step', async ({ page }) => {
  await page.goto('/');
  await page.locator('#resume-select').selectOption(steps[5].id);
  await page.getByRole('button', { name: /Consulta · Arquivo completo/ }).click();
  await page.getByRole('button', { name: 'Concluídas' }).click();
  await page.getByRole('button', { name: 'Ver instruções completas' }).click();
  await expect(page.locator(`#step-${steps[5].id}`)).toBeFocused();
  await expect(page.getByText('Busca e filtros limpos para exibir a etapa solicitada.')).toHaveText(/filtros limpos/);
  const layout = await page.evaluate(id => ({
    target: document.getElementById(`step-${id}`)!.getBoundingClientRect().top,
    toolbar: document.querySelector('input[aria-label="Buscar no roteiro e nas conquistas"]')?.closest('.sticky')?.getBoundingClientRect().bottom ?? 0
  }), steps[5].id);
  expect(layout.target).toBeGreaterThanOrEqual(layout.toolbar - 3);
});

test('journey complete has no invented next mission', async ({ page }) => {
  const state = original();
  for (const event of steps) state.steps[event.id] = true;
  await seed(page, state);
  await page.goto('/');
  await expect(page.getByText('Todos os marcos concluídos')).toBeVisible();
  await expect(page.getByText(/Nenhuma próxima missão será presumida/)).toBeVisible();
  await expect(page.locator('#resume-select')).toHaveCount(0);
});

test('real v3 JSON import/export roundtrip, rejected import does not replace stored data', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Backup do progresso' }).click();
  const state = { ...original(), steps: { [steps[3].id]: true }, achievements: { 1: true }, extraLegacy: 'preserve' };
  page.once('dialog', dialog => dialog.accept());
  await page.getByPlaceholder('Cole o texto do JSON aqui...').fill(JSON.stringify({ app: 'dd2-100-roadmap-ptbr', progress: state }));
  await page.getByRole('button', { name: 'Carregar Dados Colados' }).click();
  await expect.poll(async () => page.evaluate(key => JSON.parse(localStorage.getItem(key)!)?.steps, key))
    .toEqual(state.steps);
  // Successful import closes the dialog after its feedback; reopen it for export.
  await expect(page.getByText('Gerenciamento & Backup de Progresso')).not.toBeVisible({ timeout: 5000 });
  await page.getByRole('button', { name: 'Backup do progresso' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Baixar Arquivo JSON de Backup' }).click();
  const download = await downloadPromise;
  const downloadPath = await download.path();
  if (!downloadPath) throw new Error('O navegador não salvou o backup exportado.');
  const downloaded = JSON.parse(readFileSync(downloadPath, 'utf8'));
  expect(downloaded.progress.steps).toEqual(state.steps);
  expect(downloaded.progress.extraLegacy).toBe('preserve');
  const before = await page.evaluate(key => localStorage.getItem(key), key);
  await page.getByPlaceholder('Cole o texto do JSON aqui...').fill(JSON.stringify({ progress: null }));
  await page.getByRole('button', { name: 'Carregar Dados Colados' }).click();
  await expect(page.getByText(/O progresso precisa ser um objeto JSON/)).toBeVisible();
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(before);
});

test('retomada keyboard and axe check in the new panel', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toBeVisible();
  const audit = await new AxeBuilder({ page }).include('section[aria-labelledby="resume-heading"]').analyze();
  await testInfo.attach('axe-resume.json', { body: Buffer.from(JSON.stringify(audit.violations, null, 2)), contentType: 'application/json' });
  expect(audit.violations.filter(v => v.impact === 'serious' || v.impact === 'critical')).toEqual([]);
});

test('blocked external fonts and images do not prevent keyboard-only resume', async ({ page }) => {
  await page.route('**/*', route => {
    const url = new URL(route.request().url());
    if (url.host === '127.0.0.1:3000') return route.continue();
    return route.abort();
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Retomar a jornada' })).toBeVisible();
  const defer = page.getByRole('button', { name: 'Adiar sem concluir' });
  await defer.focus();
  await expect(defer).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#resume-select')).toBeVisible();
  const saved = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), key);
  expect(saved.deferredStepIds).toContain(steps[0].id);
  expect(saved.steps[steps[0].id]).toBeUndefined();
});


test('Mission 02: 9 chapters in one keyboard-accessible selector, no progress written by browsing', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Retomar a jornada' })).toBeVisible();
  const picker = page.getByRole('combobox', { name: 'Capítulo do roteiro' });
  await expect(picker.locator('option')).toHaveCount(9);
  const last = PHASES[PHASES.length - 1];
  await picker.selectOption(last.id);
  await expect(page.getByRole('heading', { name: 'Diário de atividades' })).toBeVisible();
  await expect(page.getByText(last.title, { exact: false }).first()).toBeVisible();
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBeNull();
  await page.getByRole('button', { name: /Consulta · Arquivo completo/ }).click();
  await expect(page.locator(`#${last.id}`)).toBeVisible();
  const kept = await page.evaluate(key => localStorage.getItem(key), key);
  await picker.selectOption(PHASES[0].id);
  await expect(page.locator(`#${PHASES[0].id}`)).toBeVisible();
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(kept);
});

test('Mission 02: compact selection, full detail in two actions, source and warnings remain discoverable', async ({ page }) => {
  await page.goto('/');
  const first = PHASES[0].events[0];
  await expect(page.locator('.journal-entry')).toHaveCount(PHASES[0].events.length);
  const next = PHASES[0].events[2];
  await page.getByRole('button', { name: `Selecionar atividade: ${next.title}` }).click();
  await expect(page.getByText('Etapa escolhida por você')).toBeVisible();
  await page.getByRole('button', { name: 'Ver instruções completas' }).click();
  await expect(page.locator(`#step-${next.id}`)).toBeFocused();
  await expect(page.locator(`#event-details-${next.id}`)).toBeVisible();
  await expect(page.locator(`#step-${first.id}`)).toBeVisible();
  const saved = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), key);
  expect(saved.activeStepId).toBe(next.id);
  expect(saved.steps[first.id]).toBeUndefined();
});

test('Mission 02: search index opens an exact match and long achievement list is on demand', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Consulta · Arquivo completo/ }).click();
  await expect(page.getByRole('button', { name: /Mostrar fichas e requisitos/ })).toBeVisible();
  await expect(page.locator('.codex-achievement')).toHaveCount(0);
  await page.getByRole('textbox', { name: 'Buscar no roteiro e nas conquistas' }).fill('Prólogo');
  const index = page.getByRole('region', { name: 'Índice de resultados' });
  await expect(index.getByRole('button').first()).toBeVisible();
  await index.getByRole('button').first().click();
  await expect(page.locator('.quest-event-details').first()).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Buscar no roteiro e nas conquistas' })).toHaveValue('');
  await page.getByRole('button', { name: /Mostrar fichas e requisitos/ }).click();
  await expect(page.locator('.codex-achievement').first()).toBeVisible();
});

test('Mission 02: screenshots and reflow across all four viewports with 20/53 saved', async ({ page }) => {
  const state = original();
  steps.slice(0, 20).forEach(event => { state.steps[event.id] = true; });
  await seed(page, state);
  mkdirSync('test-results/screenshots', { recursive: true });
  for (const [width, height] of [[375, 812], [390, 844], [820, 1180], [1440, 900]]) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await expect(page.getByText('Sugestão do roteiro · não indica sua posição real')).toBeVisible();
    const data = await page.evaluate(() => ({
      full: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth,
      top: document.getElementById('resume-heading')!.getBoundingClientRect().top,
      font: getComputedStyle(document.querySelector('.journal-entry-content strong')!).fontSize
    }));
    expect(data.full).toBeLessThanOrEqual(data.viewport + 1);
    expect(data.top).toBeGreaterThanOrEqual(0);
    expect(data.top).toBeLessThan(height);
    expect(parseFloat(data.font)).toBeGreaterThanOrEqual(16);
    await page.screenshot({ path: `test-results/screenshots/mission02-after-${width}x${height}-20of53.png`, fullPage: false });
  }
  await page.setViewportSize({ width: 320, height: 812 }); // Reflow 400% proxy: 1280 CSS px / 4
  await page.goto('/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.evaluate(() => { document.documentElement.style.zoom = '2'; }); // CSS zoom proxy, not native browser zoom
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
});

test('Mission 02: main navigation and journal controls have labels, keyboard focus, axe', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const chapterPicker = page.getByRole('combobox', { name: 'Capítulo do roteiro' });
  await chapterPicker.focus();
  await expect(chapterPicker).toBeFocused();
  await chapterPicker.press('End');
  await chapterPicker.press('Enter');
  await expect(page.getByRole('heading', { name: 'Diário de atividades' })).toBeVisible();
  const result = await new AxeBuilder({ page }).include('.quest-journal').include('.codex-chapter-picker').analyze();
  await testInfo.attach('axe-mission02.json', { body: Buffer.from(JSON.stringify(result.violations, null, 2)), contentType: 'application/json' });
  expect(result.violations.filter(v => v.impact === 'serious' || v.impact === 'critical')).toEqual([]);
});
