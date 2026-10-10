import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync } from 'node:fs';
import { PHASES } from '../src/data/roadmapData';

const key = 'dd2_roadmap_user_progress_v3';
const entries = PHASES.flatMap(phase => phase.events.map(event => ({ phase, event })));
const laterMission = entries.find(item => item.phase.id !== PHASES[0].id)!;
const laterAchievement = PHASES.slice(1).flatMap(phase => phase.achievements.map(achievement => ({phase, achievement})))[0];
const firstCritical = entries.find(item => item.event.risk === 'critico' && !!item.event.failureRisk)!;
const baseState = () => ({
  version: '3.0.0', updatedAt: '2026-01-01T00:00:00.000Z',
  steps: {} as Record<string,boolean>, achievements: {} as Record<number,boolean>,
  sphinx: {}, firstTokenLocation: '', seekerTokensCount: 0,
  barbecue: {}, maisters: {}, confirmedCheckpoints: {}
});
const saved = (page: Page) => page.evaluate(k => localStorage.getItem(k),key);
async function openConsultation(page: Page) {
  await page.goto('/');
  await page.getByRole('button', { name: 'Consulta e ferramentas' }).click();
  await expect(page.getByRole('heading', { name: 'Consulta', exact: true })).toBeVisible();
}
async function seed(page: Page, completed: number) {
  const state = baseState();
  entries.slice(0, completed).forEach(item => { state.steps[item.event.id] = true; });
  await page.addInitScript(({ key, state }) => {
    if (localStorage.getItem(key) === null) localStorage.setItem(key, JSON.stringify(state));
  }, { key, state });
}

test('busca global abre marco de outro capítulo, revela instruções e restaura foco', async ({ page }) => {
  await openConsultation(page);
  await page.getByRole('combobox', { name: 'Capítulo do roteiro' }).selectOption(PHASES[0].id);
  const input = page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' });
  await input.fill(laterMission.event.title);
  const results = page.getByRole('region', { name: 'Resultados encontrados' });
  await expect(results.getByRole('button', { name: new RegExp(laterMission.event.title, 'i') }).first()).toBeVisible();
  await results.getByRole('button', { name: new RegExp(laterMission.event.title, 'i') }).first().click();
  await expect(page.getByRole('combobox', { name: 'Capítulo do roteiro' })).toHaveValue(laterMission.phase.id);
  await expect(page.locator('#step-' + laterMission.event.id)).toBeFocused();
  await expect(page.locator('#event-details-' + laterMission.event.id)).toBeVisible();
  await expect(input).toHaveValue('');
  await expect(page.getByRole('status').filter({hasText:'Busca e filtros limpos'})).toBeVisible();
  expect(await saved(page)).toBeNull();
});

test('busca global abre conquista distante, estado visível e retorno ao catálogo', async ({ page }) => {
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill(laterAchievement.achievement.title);
  const results = page.getByRole('region', { name: 'Resultados encontrados' });
  await results.getByRole('button', { name: new RegExp(laterAchievement.achievement.title, 'i') }).first().click();
  await expect(page.getByRole('button', { name: 'Conquistas', exact: true })).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('#achievement-' + laterAchievement.achievement.id)).toBeFocused();
  await expect(page.locator('#achievement-' + laterAchievement.achievement.id)).toContainText(laterAchievement.achievement.tip);
  await page.getByRole('button', { name: 'Voltar ao acervo geral' }).click();
  await expect(page.getByRole('heading', { name: 'Selecione uma conquista' })).toBeVisible();
  expect(await saved(page)).toBeNull();
});

test('sem resultados, limpeza de filtros e alternância de três seções', async ({ page }) => {
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('nome-inexistente-xyz-987');
  await expect(page.getByRole('heading', { name: /Nenhum resultado/ })).toBeVisible();
  await page.getByRole('button', { name: 'Limpar busca e filtros' }).click();
  await page.getByRole('button', { name: 'Conquistas', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Conquistas', exact: true })).toBeVisible();
  await expect(page.locator('.consult-achievement-list button')).toHaveCount(60);
  await page.getByRole('navigation', { name: 'Seções da Consulta' }).getByRole('button', { name: 'Referências', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Referências', exact: true })).toBeVisible();
  await expect(page.getByText('Conteúdo comunitário ainda não auditado por etapa')).toBeVisible();
  await expect(page.getByRole('button', {name:'Esfinge', exact:true})).toBeVisible();
  await page.getByRole('button', { name: 'Missões', exact: true }).click();
  await expect(page.getByRole('combobox', {name:'Capítulo do roteiro'})).toBeVisible();
  await page.getByRole('combobox', { name: 'Mostrar' }).selectOption('done');
  await page.locator('.consult-controls').getByRole('button', { name: 'Limpar filtros' }).click();
  await expect(page.getByRole('combobox', { name: 'Mostrar' })).toHaveValue('all');
  await page.getByRole('button', { name: 'Voltar ao Diário' }).click();
  await expect(page.getByRole('heading', { name: 'Diário do Nascen' })).toBeFocused();
});

test('teclado e foco em fichas abertas via Diário, sem alterar progresso', async ({ page }) => {
  await page.goto('/');
  const mission = entries.find(item => item.event.achievements.length > 0)!;
  await page.getByRole('combobox', { name: 'Capítulo' }).selectOption(mission.phase.id);
  await page.getByRole('button', { name: 'Consultar atividade: ' + mission.event.title, exact:false }).click();
  await page.getByRole('button', { name: 'Informações adicionais e fontes' }).click();
  const open = page.getByRole('button', { name: 'Abrir ficha completa na Consulta' });
  await open.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#step-' + mission.event.id)).toBeFocused();
  const achievementLink = page.getByRole('region', { name:'Conquistas associadas no roteiro' })
    .getByRole('button', { name:/Abrir ficha da conquista/ }).first();
  await achievementLink.focus();
  await page.keyboard.press('Enter');
  const achId = mission.event.achievements[0];
  await expect(page.locator('#achievement-' + achId)).toBeFocused();
  expect(await saved(page)).toBeNull();
});

test('cautela crítica continua visível antes de abrir as instruções', async ({ page }) => {
  await openConsultation(page);
  await page.getByRole('combobox', { name: 'Capítulo do roteiro' }).selectOption(firstCritical.phase.id);
  const step = page.locator('#step-' + firstCritical.event.id);
  await expect(step.locator('.consult-priority-risk')).toBeVisible();
  await expect(step.locator('.consult-priority-risk')).toContainText(firstCritical.event.failureRisk!);
  await expect(step.locator('.quest-event-details')).not.toBeVisible();
});

test('P1: Missões não mostra controle inerte; Conquistas tem acervo funcional', async ({ page }) => {
  await openConsultation(page);
  for (const width of [375, 390, 1440]) {
    await page.setViewportSize({ width, height: width === 375 ? 812 : width === 390 ? 844 : 900 });
    await expect(page.getByRole('heading', { name: 'Missões', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: /Conquistas deste capítulo|Mostrar fichas e requisitos/ })).toHaveCount(0);
    await page.getByRole('button', { name: 'Conquistas', exact: true }).click();
    await expect(page.locator('.consult-achievement-list button')).toHaveCount(60);
    await page.getByRole('button', { name: 'Missões', exact: true }).click();
  }
  expect(await saved(page)).toBeNull();
});

test('P1: Referências no header limpa busca ativa e abre destino por teclado', async ({ page }) => {
  await openConsultation(page);
  const input = page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' });
  await input.fill('Prólogo');
  await expect(page.getByRole('heading', { name: 'Resultados encontrados' })).toBeVisible();
  const headerReferences = page.getByRole('navigation', { name: 'Navegação principal' })
    .getByRole('button', { name: 'Referências', exact: true });
  await headerReferences.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'Referências', exact: true })).toBeFocused();
  await expect(page.getByRole('heading', { name: 'Resultados encontrados' })).toHaveCount(0);
  await expect(input).toHaveValue('');
  await expect(page.getByRole('status').filter({ hasText: 'Busca e filtros limpos para abrir Referências.' })).toBeVisible();
  expect(await saved(page)).toBeNull();
});

test('P2: filtro de marcos mantém totais e posição ordinal original sem persistir', async ({ page }) => {
  const phase = PHASES.find(item => item.events.length === 6) ??
    PHASES.find(item => item.events.length >= 2)!;
  await openConsultation(page);
  await page.getByRole('combobox', { name: 'Capítulo do roteiro' }).selectOption(phase.id);
  const chapter = page.locator('.codex-chapter');
  await chapter.locator('.quest-complete-toggle').first().click();
  const snapshot = await saved(page);
  expect(snapshot).not.toBeNull();
  const originalTotal = phase.events.length;
  await expect(chapter).toContainText(`Etapas: 1/${originalTotal}`);
  const filter = page.getByRole('combobox', { name: 'Mostrar' });
  await filter.selectOption('done');
  await expect(chapter).toContainText(`Etapas: 1/${originalTotal}`);
  await expect(chapter).toContainText(`Sequência de Execução (${originalTotal} etapas)`);
  await expect(chapter.locator('.codex-step')).toHaveCount(1);
  await expect(chapter.locator('.codex-step').first().getByText('01.', { exact: true })).toBeVisible();
  expect(await saved(page)).toBe(snapshot);
  await filter.selectOption('undone');
  await expect(chapter.locator('.codex-step')).toHaveCount(originalTotal - 1);
  await expect(chapter.locator('.codex-step').first().getByText('02.', { exact: true })).toBeVisible();
  await expect(chapter).toContainText(`Etapas: 1/${originalTotal}`);
  expect(await saved(page)).toBe(snapshot);
});

test('P2 visual: primeiro fold mobile da Consulta, primeira missão e sem overflow', async ({ page }) => {
  mkdirSync('test-results/screenshots', { recursive: true });
  for (const [width,height] of [[375,812],[390,844]]) {
    await page.setViewportSize({ width, height });
    await openConsultation(page);
    await page.evaluate(() => window.scrollTo(0,0));
    const first = page.locator('.codex-step').first();
    const rect = await first.boundingBox();
    expect(rect, 'A primeira missão deve existir').not.toBeNull();
    expect(rect!.y, 'O início da primeira missão deve aparecer no primeiro fold').toBeLessThan(height);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
    await page.screenshot({ path: `test-results/screenshots/pr-b-review-mobile-first-fold-${width}x${height}.png`, fullPage: false });
  }
});

test('conquistas e marcos não se concluem mutuamente no catálogo', async ({ page }) => {
  await openConsultation(page);
  await page.getByRole('button', { name: 'Conquistas', exact:true }).click();
  await page.locator('.consult-achievement-list button').first().click();
  const card = page.locator('.codex-achievement');
  await card.getByRole('checkbox').check();
  let data = JSON.parse((await saved(page))!);
  expect(Object.keys(data.steps).filter(id => data.steps[id])).toHaveLength(0);
  expect(Object.values(data.achievements).filter(Boolean)).toHaveLength(1);
  await page.getByRole('button',{name:'Missões',exact:true}).click();
  await page.locator('.codex-step .quest-complete-toggle').first().click();
  data = JSON.parse((await saved(page))!);
  expect(Object.values(data.achievements).filter(Boolean)).toHaveLength(1);
  expect(Object.values(data.steps).filter(Boolean)).toHaveLength(1);
});

test('zero, 20 e 53 de 53 marcos não alteram a contagem das 60 conquistas', async ({ page }) => {
  for (const n of [0,20,53]) {
    await page.context().clearCookies();
    await page.addInitScript(() => localStorage.clear());
    await seed(page,n);
    await openConsultation(page);
    await page.getByRole('button', { name:'Conquistas',exact:true }).click();
    await expect(page.locator('.consult-achievement-list button')).toHaveCount(60);
    const state = JSON.parse((await saved(page))!);
    expect(Object.values(state.steps).filter(Boolean)).toHaveLength(n);
    expect(Object.values(state.achievements).filter(Boolean)).toHaveLength(0);
  }
});

test('ícones externos indisponíveis mantêm fallback legível e sem overflow', async ({ page }) => {
  await page.route('https://**/*', route => route.abort());
  await page.setViewportSize({width:375,height:812});
  await openConsultation(page);
  await page.getByRole('button',{name:'Conquistas',exact:true}).click();
  await page.locator('.consult-achievement-list button').first().click();
  await expect(page.locator('.codex-achievement').getByText('Ícone', { exact:true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
});

test('axe e capturas reais em quatro viewports e oito estados de Consulta', async ({ page }) => {
  mkdirSync('test-results/screenshots', { recursive:true });
  for (const [width,height] of [[375,812],[390,844],[1440,900],[1920,1080]]) {
    await page.setViewportSize({width,height});
    await openConsultation(page);
    const screenshot = async (label:string, showSection = false) => {
      if (!showSection) await page.evaluate(() => window.scrollTo(0,0));
      await page.screenshot({path:'test-results/screenshots/pr-b-after-' + label + '-' + width + 'x' + height + '.png',fullPage:false});
      const size = await page.evaluate(() => [document.documentElement.scrollWidth,document.documentElement.clientWidth]);
      expect(size[0],label + ' overflow horizontal').toBeLessThanOrEqual(size[1]+1);
    };
    await screenshot('entry');
    await page.getByRole('heading',{name:'Missões',exact:true}).scrollIntoViewIfNeeded();
    await screenshot('missions',true);
    await page.getByRole('button',{name:'Conquistas',exact:true}).click();
    await page.getByRole('heading',{name:'Conquistas',exact:true}).scrollIntoViewIfNeeded();
    await screenshot('achievements',true);
    await page.getByRole('navigation',{name:'Seções da Consulta'}).getByRole('button',{name:'Referências',exact:true}).click();
    await page.getByRole('heading',{name:'Referências',exact:true}).scrollIntoViewIfNeeded();
    await screenshot('references',true);
    await page.getByRole('searchbox',{name:'Buscar em todos os 9 capítulos'}).fill('conquista');
    await page.getByRole('heading',{name:'Resultados encontrados'}).scrollIntoViewIfNeeded();
    await screenshot('global-search',true);
    await page.getByRole('searchbox',{name:'Buscar em todos os 9 capítulos'}).fill('termo-sem-resultados-999');
    await page.getByRole('heading',{name:/Nenhum resultado/}).scrollIntoViewIfNeeded();
    await screenshot('empty',true);
    await page.getByRole('button',{name:'Limpar busca e filtros'}).click();
    await page.getByRole('button',{name:'Missões',exact:true}).click();
    await page.getByRole('combobox',{name:'Capítulo do roteiro'}).selectOption(firstCritical.phase.id);
    await page.locator('#step-' + firstCritical.event.id).scrollIntoViewIfNeeded();
    await screenshot('critical',true);
    await page.getByRole('combobox',{name:'Capítulo do roteiro'}).selectOption(firstCritical.phase.id);
    await page.getByRole('button',{name:'Voltar ao Diário'}).click();
    await page.getByRole('button',{name:'Consulta e ferramentas'}).click();
    await page.getByRole('button',{name:'Conquistas',exact:true}).click();
    await page.locator('.consult-achievement-list button').first().click();
    await page.locator('.codex-achievement').scrollIntoViewIfNeeded();
    await screenshot('achievement-from-diary-flow',true);
    const scan = await new AxeBuilder({page}).include('.consultation').analyze();
    expect(scan.violations.filter(v=>['critical','serious'].includes(v.impact??''))).toEqual([]);
  }
});
