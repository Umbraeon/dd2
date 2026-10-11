import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync, readFileSync } from 'node:fs';
import { PHASES } from '../src/data/roadmapData';

const storageKey = 'dd2_roadmap_user_progress_v3';
const allEvents = PHASES.flatMap(phase => phase.events);
const state = () => ({
  version: '3.0.0', updatedAt: '2026-01-01T00:00:00.000Z',
  steps: {} as Record<string, boolean>, achievements: {} as Record<number, boolean>,
  sphinx: {}, firstTokenLocation: '', seekerTokensCount: 0,
  barbecue: {}, maisters: {}, confirmedCheckpoints: {}
});
const stored = (page: Page) => page.evaluate(key => localStorage.getItem(key), storageKey);
const hub = (page: Page) => page.getByRole('region', { name: 'Central de Ferramentas' });
const headerButton = (page: Page) => page.getByRole('button', { name: 'Abrir central de ferramentas', exact: true });
const modal = (page: Page) => page.locator('.fixed.inset-0.z-50');
const closeModal = (page: Page) => modal(page).locator('button[title="Fechar"]').first();
const options = [
  ['Esfinge', /Grimório da Esfinge · 10 Enigmas/],
  ['Mementos do Buscador', /Mementos do Buscador · 80 Tokens/],
  ['Churrasco', /Mestre do Churrasco · Matriz/],
  ['Mestres', /Mestre dos Mestres · 12 Ensinamentos/],
  ['Pontos de decisão', /Pontos de decisão/],
  ['Backup do progresso', /Gerenciamento & Backup de Progresso/],
  ['Glossário PT\/EN', /Glossário Bilíngue de Termos/]
] as const;

async function seed(page: Page, done: number) {
  const base = state();
  allEvents.slice(0, done).forEach(event => { base.steps[event.id] = true; });
  await page.addInitScript(({ key, data }) => {
    if (localStorage.getItem(key) === null) localStorage.setItem(key, JSON.stringify(data));
  }, {key:storageKey, data:base});
}
async function openHub(page: Page) {
  await headerButton(page).click();
  await expect(hub(page)).toBeVisible();
}
async function openReferenceHub(page: Page) {
  await page.getByRole('button', { name: 'Consulta e ferramentas' }).click();
  await page.getByRole('navigation', { name: 'Seções da Consulta' })
    .getByRole('button', { name: 'Referências', exact: true }).click();
  const entry = page.locator('.consult-tools').getByRole('button', { name: 'Abrir Central de Ferramentas' });
  await entry.click();
  await expect(hub(page)).toBeVisible();
  return entry;
}

test('cabeçalho abre o painel real, não Esfinge; sete ferramentas em três grupos', async ({page}) => {
  await page.goto('/');
  await expect(headerButton(page)).toHaveAttribute('aria-expanded', 'false');
  await openHub(page);
  await expect(headerButton(page)).toHaveAttribute('aria-expanded', 'true');
  await expect(headerButton(page)).toHaveAttribute('aria-controls','tools-hub-panel');
  await expect(modal(page)).toHaveCount(0);
  await expect(hub(page).locator('.tools-hub-action')).toHaveCount(7);
  for (const [name] of options) await expect(hub(page).getByRole('button', { name: new RegExp('^' + name.replace('/', '\\/')) })).toBeVisible();
  for (const group of ['Rastreadores','Segurança e progresso','Apoio'])
    await expect(hub(page).getByRole('heading', {name:group})).toBeVisible();
  expect(await stored(page)).toBeNull();
});

test('sete opções abrem apenas o respectivo modal; navegação não registra progresso', async ({page}) => {
  await page.goto('/');
  for (const [name, heading] of options) {
    await openHub(page);
    await hub(page).getByRole('button', { name: new RegExp('^'+name.replace('/', '\\/')) }).click();
    await expect(hub(page)).toBeHidden();
    await expect(modal(page)).toHaveCount(1);
    await expect(modal(page).getByRole('heading', {name:heading})).toBeVisible();
    await expect(closeModal(page)).toBeFocused();
    await closeModal(page).click();
    await expect(modal(page)).toHaveCount(0);
    await expect(headerButton(page)).toBeFocused();
  }
  expect(await stored(page)).toBeNull();
});

test('Enter, Space, Tab, Shift+Tab, Escape, fechamento explícito e retorno de foco', async ({page}) => {
  await page.goto('/');
  await headerButton(page).focus();
  await page.keyboard.press('Enter');
  await expect(hub(page)).toBeVisible();
  await expect(hub(page).getByRole('button', {name:/^Esfinge/})).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(hub(page).getByRole('button', {name:/^Mementos do Buscador/})).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(hub(page).getByRole('button', {name:/^Esfinge/})).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(hub(page)).toBeHidden();
  await expect(headerButton(page)).toBeFocused();
  await headerButton(page).focus();
  await page.keyboard.press('Space');
  await expect(hub(page)).toBeVisible();
  await hub(page).getByRole('button',{name:'Fechar central de ferramentas'}).click();
  await expect(headerButton(page)).toBeFocused();
  await openHub(page);
  await hub(page).getByRole('button',{name:/^Mestres/}).focus();
  await page.keyboard.press('Space');
  await expect(modal(page).getByRole('heading',{name:/Mestre dos Mestres/})).toBeVisible();
  await expect(hub(page)).toBeHidden();
  expect(await stored(page)).toBeNull();
});

test('Referências acessa o mesmo painel, fecha por Escape e mantém fontes, metodologia e glossário', async ({page}) => {
  await page.goto('/');
  const entry = await openReferenceHub(page);
  await expect(entry).toHaveAttribute('aria-controls','tools-hub-panel');
  await expect(entry).toHaveAttribute('aria-expanded','true');
  await expect(page.locator('.consult-reference-list a').first()).toBeVisible();
  await expect(page.getByRole('button', {name:'Ver fontes do guia'})).toBeVisible();
  await expect(page.getByRole('button', {name:'Consultar glossário bilíngue'})).toBeVisible();
  await expect(page.locator('.consult-tools button')).toHaveCount(1);
  await page.keyboard.press('Escape');
  await expect(entry).toBeFocused();
  await entry.focus();
  await page.keyboard.press('Enter');
  await hub(page).getByRole('button', {name:/^Esfinge/}).click();
  await expect(modal(page).getByRole('heading',{name:/Grimório da Esfinge/})).toBeVisible();
  await closeModal(page).click();
  await page.getByRole('button',{name:'Consultar glossário bilíngue'}).click();
  await expect(modal(page).getByRole('heading',{name:/Glossário Bilíngue/})).toBeVisible();
  expect(await stored(page)).toBeNull();
});

test('atalhos Alertas/Backup independentes e recuperação com armazenamento inválido', async ({page}) => {
  await page.goto('/');
  await page.getByRole('button',{name:'Conferir alertas'}).click();
  await expect(modal(page).getByRole('heading',{name:/Pontos de decisão/})).toBeVisible();
  await closeModal(page).click();
  await page.getByRole('button',{name:'Backup do progresso'}).click();
  await expect(modal(page).getByRole('heading',{name:/Gerenciamento & Backup/})).toBeVisible();
  await closeModal(page).click();
  expect(await stored(page)).toBeNull();

  await page.addInitScript(key => localStorage.setItem(key,'{invalid-json'), storageKey);
  await page.reload();
  await expect(page.getByRole('alert')).toContainText('O progresso armazenado está inválido');
  const original = await stored(page);
  await page.getByRole('alert').getByRole('button',{name:'Abrir backup'}).click();
  await expect(modal(page).getByRole('heading',{name:/Gerenciamento & Backup/})).toBeVisible();
  expect(await stored(page)).toBe(original);
  await closeModal(page).click();
  await page.getByRole('button',{name:'Backup do progresso'}).click();
  await expect(modal(page)).toHaveCount(1);
  expect(await stored(page)).toBe(original);
});

test('P1: foco retorna ao cabeçalho após fechar rastreador pelo teclado em mobile e desktop', async ({page}) => {
  mkdirSync('test-results/screenshots', {recursive:true});
  for (const [width,height] of [[390,844],[1440,900]]) {
    await page.setViewportSize({width,height});
    await page.goto('/');
    await headerButton(page).focus();
    await page.keyboard.press('Enter');
    await expect(hub(page).getByRole('button',{name:/^Esfinge/})).toBeFocused();
    await hub(page).getByRole('button',{name:/^Mementos do Buscador/}).focus();
    await page.keyboard.press('Enter');
    await expect(closeModal(page)).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(modal(page)).toHaveCount(0);
    await expect(headerButton(page)).toBeFocused();
    await page.screenshot({
      path:`test-results/screenshots/pr-c-review-modal-focus-restored-header-${width}x${height}.png`,
      fullPage:false
    });
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button',{name:'Backup do progresso'})).toBeFocused();
    expect(await stored(page)).toBeNull();
  }
});

test('P1: foco retorna à entrada Referências; se invisível usa acionador estável do cabeçalho', async ({page}) => {
  await page.goto('/');
  const entry = await openReferenceHub(page);
  await hub(page).getByRole('button',{name:/^Esfinge/}).focus();
  await page.keyboard.press('Enter');
  await expect(closeModal(page)).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(entry).toBeFocused();
  // References entry is the final tab stop in the page. Tab forward may
  // legitimately leave the document; Shift+Tab must reach the preceding link,
  // and a subsequent Tab must return to the restored origin.
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('button',{name:'Consultar glossário bilíngue'})).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(entry).toBeFocused();
  await page.keyboard.press('Enter');
  await hub(page).getByRole('button',{name:/^Mementos do Buscador/}).focus();
  await page.keyboard.press('Enter');
  await expect(closeModal(page)).toBeFocused();
  // Simulate a route change that leaves the previously active trigger unavailable.
  await entry.evaluate(element => element.setAttribute('hidden',''));
  await page.keyboard.press('Enter');
  await expect(headerButton(page)).toBeFocused();
  expect(await stored(page)).toBeNull();
});

test('P2: clique em conteúdo passivo devolve foco; outro botão mantém seu próprio fluxo', async ({page}) => {
  mkdirSync('test-results/screenshots', {recursive:true});
  for (const [width,height] of [[375,812],[1440,900]]) {
    await page.setViewportSize({width,height});
    await page.goto('/');
    await openHub(page);
    await expect(hub(page).getByRole('button',{name:/^Esfinge/})).toBeFocused();
    await page.locator('footer.codex-footer').click({position:{x:12,y:12}});
    await expect(hub(page)).toBeHidden();
    await expect(headerButton(page)).toBeFocused();
    await page.screenshot({
      path:`test-results/screenshots/pr-c-review-outside-passive-focus-${width}x${height}.png`,
      fullPage:false
    });
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button',{name:'Backup do progresso'})).toBeFocused();
    await openHub(page);
    await page.locator('header.codex-header').getByRole('button',{name:'Backup do progresso',exact:true}).click();
    await expect(hub(page)).toBeHidden();
    await expect(modal(page).getByRole('heading',{name:/Gerenciamento & Backup/})).toBeVisible();
    await expect(closeModal(page)).toBeFocused();
    await closeModal(page).click();
    await expect(page.getByRole('button',{name:'Backup do progresso'})).toBeFocused();
    expect(await stored(page)).toBeNull();
  }
});

test('registro do primeiro memento permanece compartilhado com a Esfinge', async ({page}) => {
  await page.goto('/');
  await openHub(page);
  await hub(page).getByRole('button',{name:/^Esfinge/}).click();
  const record = 'Ponte de pedra do posto avançado · teste de sincronização';
  await modal(page).locator('textarea').first().fill(record);
  await expect.poll(async () => JSON.parse((await stored(page))!).firstTokenLocation).toBe(record);
  await closeModal(page).click();
  await openHub(page);
  await hub(page).getByRole('button',{name:/^Mementos do Buscador/}).click();
  await expect(modal(page).locator('textarea').first()).toHaveValue(record);
  await modal(page).getByRole('button',{name:'Aumentar 1'}).click();
  await expect.poll(async () => JSON.parse((await stored(page))!).seekerTokensCount).toBe(1);
  await closeModal(page).click();
  await openHub(page);
  await hub(page).getByRole('button',{name:/^Esfinge/}).click();
  await expect(modal(page).locator('textarea').first()).toHaveValue(record);
});

test('backup v3 importa/exporta sem mudança de contrato, após entrada pela central', async ({page}) => {
  await page.goto('/');
  await openHub(page);
  await hub(page).getByRole('button',{name:/^Backup do progresso/}).click();
  const data = {...state(), steps: {[allEvents[4].id]:true}, achievements:{1:true}, firstTokenLocation:'Registro v3 de prova'};
  page.once('dialog', dialog => dialog.accept());
  await page.getByPlaceholder('Cole o texto do JSON aqui...').fill(JSON.stringify({app:'dd2-100-roadmap-ptbr',progress:data}));
  await page.getByRole('button',{name:'Carregar Dados Colados'}).click();
  await expect.poll(async () => JSON.parse((await stored(page))!)?.steps).toEqual(data.steps);
  await expect(modal(page)).toHaveCount(0, {timeout:5000});
  await openHub(page);
  await hub(page).getByRole('button',{name:/^Backup do progresso/}).click();
  const downloadPending = page.waitForEvent('download');
  await page.getByRole('button',{name:'Baixar Arquivo JSON de Backup'}).click();
  const download = await downloadPending;
  const downloaded = JSON.parse(readFileSync((await download.path())!, 'utf8'));
  expect(downloaded.progress.steps).toEqual(data.steps);
  expect(downloaded.progress.firstTokenLocation).toBe(data.firstTokenLocation);
});

test('progresso 0/20/53 e rotas Diário/Consulta não mudam ao navegar na central', async ({page}) => {
  for (const done of [0,20,53]) {
    await page.goto('/');
    const base = state();
    allEvents.slice(0,done).forEach(event => { base.steps[event.id] = true; });
    await page.evaluate(({key,data}) => localStorage.setItem(key,JSON.stringify(data)),
      {key:storageKey,data:base});
    await page.reload();
    const before = await stored(page);
    await expect(page.getByRole('heading',{name:'Diário do Nascen'})).toBeVisible();
    await openHub(page);
    await page.keyboard.press('Escape');
    await openHub(page);
    await hub(page).getByRole('button',{name:/^Churrasco/}).click();
    await expect(modal(page)).toHaveCount(1);
    await closeModal(page).click();
    await page.getByRole('button',{name:'Consulta e ferramentas'}).click();
    await expect(page.getByRole('heading',{name:'Consulta', exact:true})).toBeVisible();
    await page.getByRole('searchbox',{name:'Buscar em todos os 9 capítulos'}).fill('Prólogo');
    await expect(page.getByRole('heading',{name:'Resultados encontrados'})).toBeVisible();
    await page.getByRole('button',{name:'Voltar ao Diário'}).click();
    await expect(page.getByRole('heading',{name:'Diário do Nascen'})).toBeVisible();
    expect(await stored(page)).toBe(before);
  }
});

test('quatro viewports: evidências Chromium, foco visível, sem overflow e axe na central', async ({page}, testInfo) => {
  test.setTimeout(140_000);
  mkdirSync('test-results/screenshots', {recursive:true});
  for (const [width,height] of [[375,812],[390,844],[1440,900],[1920,1080]]) {
    await page.setViewportSize({width,height});
    await page.goto('/');
    const path = (name:string) => 'test-results/screenshots/pr-c-after-' + name + '-' + width + 'x' + height + '.png';
    const shot = async (name:string) => {
      await page.screenshot({path:path(name),fullPage:false});
      const dimensions = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        width: document.documentElement.clientWidth
      }));
      expect(dimensions.scroll, 'overflow horizontal em '+name).toBeLessThanOrEqual(dimensions.width + 1);
    };
    await shot('header-closed');
    await openHub(page);
    await shot('hub-header');
    const headerBottom = await page.locator('header.codex-header').evaluate(node => node.getBoundingClientRect().bottom);
    const hubTop = await page.locator('#tools-hub-panel').evaluate(node => node.getBoundingClientRect().top);
    expect(hubTop).toBeGreaterThanOrEqual(headerBottom);
    await expect(hub(page).getByRole('button',{name:/^Esfinge/})).toBeFocused();
    await shot('keyboard-focus');
    const issues = await new AxeBuilder({page}).include('#tools-hub-panel').analyze();
    await testInfo.attach('axe-tools-'+width+'.json', {body:Buffer.from(JSON.stringify(issues.violations,null,2)),contentType:'application/json'});
    expect(issues.violations.filter(v=>['serious','critical'].includes(v.impact??''))).toEqual([]);
    await hub(page).getByRole('button',{name:/^Esfinge/}).click();
    await shot('sphinx-via-hub');
    await closeModal(page).click();
    await openHub(page);
    await hub(page).getByRole('button',{name:/^Mementos do Buscador/}).click();
    await shot('tokens-via-hub');
    await closeModal(page).click();
    await page.getByRole('button',{name:'Backup do progresso'}).click();
    await shot('backup-shortcut');
    await closeModal(page).click();
    await page.getByRole('button',{name:'Consulta e ferramentas'}).click();
    await page.getByRole('navigation',{name:'Seções da Consulta'}).getByRole('button',{name:'Referências',exact:true}).click();
    await page.locator('.consult-tools button').click();
    await shot('hub-from-references');
    expect(await stored(page)).toBeNull();
  }
});
