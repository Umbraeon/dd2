import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync, readFileSync } from 'node:fs';
import { PHASES, RISK_CHECKPOINTS } from '../src/data/roadmapData';

const key = 'dd2_roadmap_user_progress_v3';
const all = PHASES.flatMap(phase => phase.events.map(event => ({ phase, event })));
const steps = all.map(item => item.event);
const original = () => ({
  version: '3.0.0', updatedAt: '2026-01-01T10:00:00.000Z',
  steps: {} as Record<string, boolean>, achievements: {} as Record<number, boolean>,
  sphinx: {}, firstTokenLocation: '', seekerTokensCount: 0, barbecue: {},
  maisters: {}, confirmedCheckpoints: {}
});
async function seed(page: Page, state: ReturnType<typeof original> & { activeStepId?: string; deferredStepIds?: string[] }) {
  await page.addInitScript(({ key, state }) => {
    if (localStorage.getItem(key) === null) localStorage.setItem(key, JSON.stringify(state));
  }, { key, state });
}
async function browse(page: Page, index: number) {
  const { phase, event } = all[index];
  await page.getByRole('combobox', { name: 'Capítulo' }).selectOption(phase.id);
  if (index < steps.length && index > 0) {
    await page.getByRole('button', { name: 'Concluídas', exact: false }).count(); // ensure tabs are present
  }
  await page.getByRole('button', { name: `Consultar atividade: ${event.title}` }).click();
}
const storage = (page: Page) => page.evaluate(key => localStorage.getItem(key), key);

test('new player: current/suggested step in first screen, no storage writes, four real screenshots', async ({ page }) => {
  mkdirSync('test-results/screenshots', { recursive: true });
  for (const [width, height] of [[375, 812], [390, 844], [1440, 900], [1920, 1080]]) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Diário do Nascen' })).toBeVisible();
    await expect(page.getByText('Sugestão do roteiro · não indica sua posição real')).toBeVisible();
    await expect(page.locator('.quest-codex')).toBeInViewport();
    const dimensions = await page.evaluate(() => ({
      width: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.width + 1);
    await page.screenshot({ path: `test-results/screenshots/review-before-progress-${width}x${height}.png`, fullPage: false });
    if (width >= 1000) {
      const ratio = await page.evaluate(() => {
        const a = document.querySelector('.quest-master')!.getBoundingClientRect();
        const b = document.querySelector('.quest-detail')!.getBoundingClientRect();
        return a.width / (a.width + b.width);
      });
      expect(ratio).toBeGreaterThan(.41);
      expect(ratio).toBeLessThan(.46);
      await expect(page.locator('.quest-panorama img')).toBeVisible();
    }
  }
  expect(await storage(page)).toBeNull();
});

test('20/53: screenshot on four viewports, active suggestion is not assumed position', async ({ page }) => {
  const state = original();
  steps.slice(0, 20).forEach(event => { state.steps[event.id] = true; });
  await seed(page, state);
  mkdirSync('test-results/screenshots', { recursive: true });
  for (const [width, height] of [[375, 812], [390, 844], [1440, 900], [1920, 1080]]) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await expect(page.getByText('Sugestão do roteiro · não indica sua posição real')).toBeVisible();
    await expect(page.locator('.quest-master')).toContainText(steps[20].title);
    const dim = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
    expect(dim[0]).toBeLessThanOrEqual(dim[1] + 1);
    await page.screenshot({ path: `test-results/screenshots/review-20of53-${width}x${height}.png`, fullPage: false });
  }
  expect(JSON.parse((await storage(page))!).steps[steps[0].id]).toBe(true);
});

test('inspecting another item updates context without writing storage', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const item = PHASES[0].events[2];
  await page.getByRole('button', { name: `Consultar atividade: ${item.title}` }).click();
  await expect(page.getByRole('heading', { name: item.title })).toBeVisible();
  await expect(page.getByText('APENAS EM CONSULTA')).toBeVisible();
  await expect(page.getByRole('button', { name: `Consultar atividade: ${item.title}` })).toHaveAttribute('aria-current', 'true');
  expect(await storage(page)).toBeNull();
});

test('20/53: nonlinear explicit selection persists; prior steps not implicitly completed', async ({ page }) => {
  const state = original();
  steps.slice(0, 20).forEach(event => { state.steps[event.id] = true; });
  await seed(page, state);
  await page.goto('/');
  const later = all[45];
  await page.getByRole('combobox', { name: 'Capítulo' }).selectOption(later.phase.id);
  await page.getByRole('button', { name: `Consultar atividade: ${later.event.title}` }).click();
  expect(JSON.parse((await storage(page))!).activeStepId).toBeUndefined();
  await page.getByRole('button', { name: /Fixar como atual/ }).click();
  await expect(page.getByText('Etapa escolhida por você')).toBeVisible();
  await page.reload();
  await expect(page.getByText('Etapa escolhida por você')).toBeVisible();
  const saved = JSON.parse((await storage(page))!);
  expect(saved.activeStepId).toBe(later.event.id);
  expect(saved.steps[steps[0].id]).toBe(true);
  expect(saved.steps[steps[20].id]).toBeUndefined();
  expect(saved.steps[44].id).toBeUndefined();
});

test('defer is not completion; explicit retake, completion and clearing active are reversible', async ({ page }) => {
  await page.goto('/');
  const first = steps[0].id;
  await page.getByRole('button', { name: 'Adiar', exact: true }).click();
  let saved = JSON.parse((await storage(page))!);
  expect(saved.deferredStepIds).toContain(first);
  expect(saved.steps[first]).toBeUndefined();
  await page.getByRole('button', { name: 'Retomar e fixar' }).click();
  saved = JSON.parse((await storage(page))!);
  expect(saved.activeStepId).toBe(first);
  expect(saved.deferredStepIds).not.toContain(first);
  await page.getByRole('button', { name: 'Concluir marco' }).click();
  saved = JSON.parse((await storage(page))!);
  expect(saved.steps[first]).toBe(true);
  expect(saved.activeStepId).toBe(first);
  await expect(page.getByText('Etapa escolhida concluída')).toBeVisible();
  await page.getByRole('button', { name: 'Desmarcar conclusão' }).click();
  expect(JSON.parse((await storage(page))!).steps[first]).toBe(false);
  await page.getByRole('button', { name: 'Desafixar atual' }).click();
  expect(JSON.parse((await storage(page))!).activeStepId).toBeUndefined();
});

test('all complete shows terminal state instead of inventing a new step', async ({ page }) => {
  const state = original();
  steps.forEach(event => { state.steps[event.id] = true; });
  await seed(page, state);
  await page.goto('/');
  await expect(page.getByText('Todos os marcos concluídos')).toBeVisible();
  await expect(page.getByText(/Nenhuma próxima missão será presumida/)).toBeVisible();
  await expect(page.getByRole('button', { name: /Concluídas/ })).toHaveAttribute('aria-pressed', 'true');
});

test('chapter navigation has all 9 destinations and does not write progress', async ({ page }) => {
  await page.goto('/');
  const chapter = page.getByRole('combobox', { name: 'Capítulo' });
  await expect(chapter.locator('option')).toHaveCount(9);
  const last = PHASES[PHASES.length - 1];
  await chapter.selectOption(last.id);
  await expect(page.locator('.quest-master')).toContainText(last.title);
  await expect(page.locator('.quest-master')).toContainText(last.slug);
  expect(await storage(page)).toBeNull();
});

test('mobile list → detail → back; consultation alone is nonpersistent', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('.quest-master')).toBeVisible();
  await expect(page.locator('.quest-detail')).toBeHidden();
  const next = PHASES[0].events[1];
  await page.getByRole('button', { name: `Consultar atividade: ${next.title}` }).click();
  await expect(page.locator('.quest-detail')).toBeVisible();
  await expect(page.locator('.quest-master')).toBeHidden();
  await expect(page.getByRole('heading', { name: next.title })).toBeVisible();
  await page.getByRole('button', { name: 'Voltar à lista de missões' }).click();
  await expect(page.locator('.quest-master')).toBeVisible();
  expect(await storage(page)).toBeNull();
});

test('warnings are visible without opening extra details, and factual limits are explicit', async ({ page }) => {
  const cp = RISK_CHECKPOINTS[0];
  await page.goto('/');
  await page.getByRole('combobox', { name: 'Capítulo' }).selectOption(cp.phaseId);
  await expect(page.getByText(/alerta\(s\) cadastrados para este capítulo/)).toBeVisible();
  await expect(page.locator('.quest-chapter-alert')).toContainText('ainda não foi verificada');
  await page.getByRole('button', { name: 'Ver alertas' }).click();
  await expect(page.getByText(cp.title).first()).toBeVisible();
});

test('full details and exact step navigation remain available without losing persisted active', async ({ page }) => {
  await page.goto('/');
  const target = PHASES[0].events[1];
  await page.getByRole('button', { name: `Consultar atividade: ${target.title}` }).click();
  await page.getByRole('button', { name: 'Informações adicionais e fontes' }).click();
  await expect(page.locator('.quest-more-content')).toBeVisible();
  await page.getByRole('button', { name: 'Abrir ficha completa na Consulta' }).click();
  await expect(page.locator(`#step-${target.id}`)).toBeFocused();
  await expect(page.locator(`#event-details-${target.id}`)).toBeVisible();
  expect(await storage(page)).toBeNull();
});

test('search index still opens exact achievements and records in secondary consultation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Consulta e ferramentas' }).click();
  await page.getByRole('textbox', { name: 'Buscar no roteiro e nas conquistas' }).fill('Prólogo');
  const index = page.getByRole('region', { name: 'Índice de resultados' });
  await expect(index.getByRole('button').first()).toBeVisible();
  await index.getByRole('button').first().click();
  await expect(page.locator('.quest-event-details').first()).toBeVisible();
  await page.getByRole('button', { name: /Mostrar fichas e requisitos/ }).click();
  await expect(page.locator('.codex-achievement').first()).toBeVisible();
});

test('real v3 JSON import/export roundtrip, rejected import does not replace stored data', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Backup do progresso' }).click();
  const state = { ...original(), steps: { [steps[3].id]: true }, achievements: { 1: true }, extraLegacy: 'preserve' };
  page.once('dialog', dialog => dialog.accept());
  await page.getByPlaceholder('Cole o texto do JSON aqui...').fill(JSON.stringify({ app: 'dd2-100-roadmap-ptbr', progress: state }));
  await page.getByRole('button', { name: 'Carregar Dados Colados' }).click();
  await expect.poll(async () => page.evaluate(key => JSON.parse(localStorage.getItem(key)!)?.steps, key)).toEqual(state.steps);
  await expect(page.getByText('Gerenciamento & Backup de Progresso')).not.toBeVisible({ timeout: 5000 });
  await page.getByRole('button', { name: 'Backup do progresso' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Baixar Arquivo JSON de Backup' }).click();
  const download = await downloadPromise;
  const path = await download.path();
  if (!path) throw Error('O navegador não salvou backup exportado');
  const downloaded = JSON.parse(readFileSync(path, 'utf8'));
  expect(downloaded.progress.steps).toEqual(state.steps);
  expect(downloaded.progress.extraLegacy).toBe('preserve');
  const before = await storage(page);
  await page.getByPlaceholder('Cole o texto do JSON aqui...').fill(JSON.stringify({ progress: null }));
  await page.getByRole('button', { name: 'Carregar Dados Colados' }).click();
  await expect(page.getByText(/O progresso precisa ser um objeto JSON/)).toBeVisible();
  expect(await storage(page)).toBe(before);
});

test('blocked external images and fonts display SVG panorama fallback and preserve controls', async ({ page }) => {
  await page.route('**/*', route => {
    const url = new URL(route.request().url());
    if (url.host === '127.0.0.1:3000') return route.continue();
    return route.abort();
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.locator('.quest-panorama img.quest-fallback-scene')).toBeVisible();
  await expect(page.getByRole('button', { name: /Fixar como atual/ })).toBeVisible();
  await page.getByRole('button', { name: /Fixar como atual/ }).focus();
  await page.keyboard.press('Enter');
  expect(JSON.parse((await storage(page))!).activeStepId).toBe(steps[0].id);
});

test('axe serious/critical on current master/detail and keyboard focus', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const element = page.getByRole('combobox', { name: 'Capítulo' });
  await element.focus();
  await expect(element).toBeFocused();
  const left = await new AxeBuilder({ page }).include('.quest-codex').analyze();
  await testInfo.attach('axe-quest-codex-list.json', { body: Buffer.from(JSON.stringify(left.violations, null, 2)), contentType: 'application/json' });
  expect(left.violations.filter(v => v.impact === 'serious' || v.impact === 'critical')).toEqual([]);
  await page.getByRole('button', { name: `Consultar atividade: ${steps[0].title}` }).click();
  const right = await new AxeBuilder({ page }).include('.quest-codex').analyze();
  await testInfo.attach('axe-quest-codex-detail.json', { body: Buffer.from(JSON.stringify(right.violations, null, 2)), contentType: 'application/json' });
  expect(right.violations.filter(v => v.impact === 'serious' || v.impact === 'critical')).toEqual([]);
});

test('reflow proxy at 320 CSS px and CSS zoom 2× have no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 812 });
  await page.goto('/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.evaluate(() => { document.documentElement.style.zoom = '2'; });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
});
