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
  const grim = items.filter({ has: page.getByRole('heading', { name: 'Fulminous Shield', exact: true }) });
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

test('Diário: Melve exibe Beren e Trysha sem classificar Myrddin como missão local', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('combobox', { name: 'Capítulo' }).selectOption('melve');
  await page.getByRole('button', { name: /Consultar atividade: Conheça Beren e Trysha/ }).click();
  const panel = page.getByRole('region', { name: 'Guias detalhados relacionados' });
  await expect(panel.locator('details')).toHaveCount(3);
  await expect(panel.locator('#quest-guide-sorcerers_appraisal')).toHaveCount(0);
  const beren = panel.locator('#quest-guide-beren_claw');
  await beren.locator('summary').click();
  await expect(beren).toContainText('três espadas');
  await expect(beren).toContainText('Humphrey');
  const final = panel.locator('#quest-guide-beren_final_lesson');
  await final.locator('summary').click();
  await expect(final).toContainText('Champion’s Fable');
  await expect(final).toContainText('Arc of Might');
  const trysha = panel.locator('details').filter({ hasText: /Magia Vertiginosa/ });
  await trysha.locator('summary').click();
  await expect(trysha).toContainText('pelo menos três grimórios autênticos');
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('Diário: Myrddin tem guia próprio na rota de Vernworth e Cidade de Descanso da Fronteira', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('combobox', { name: 'Capítulo' }).selectOption('vernworth2');
  await page.getByRole('button', { name: /Consultar atividade: Visite Myrddin na Cidade de Descanso da Fronteira/ }).click();
  const panel = page.getByRole('region', { name: 'Guias detalhados relacionados' });
  const myrddin = panel.locator('#quest-guide-sorcerers_appraisal');
  await myrddin.locator('summary').click();
  await expect(myrddin).toContainText('não em Melve nem dentro de Vernworth');
  await expect(myrddin).toContainText('três falsificações diferentes');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
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


test('coroação: cinco fichas acionáveis e nenhuma escrita automática de progresso', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('combobox', { name: 'Capítulo' }).selectOption('vernworth3');
  await page.getByRole('button', { name: /Consultar atividade: Confira as missões pendentes antes da coroação/ }).click();
  const panel = page.getByRole('region', { name: 'Guias detalhados relacionados' });
  await expect(panel.locator('details')).toHaveCount(5);
  const feast = panel.locator('#quest-guide-feast_deception');
  await feast.locator('summary').click();
  await expect(feast).toContainText('Quando Brant perguntar se você está pronto');
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('busca global encontra a missão de investigação de Disa sem alertas editoriais', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('O Plano de Disa');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /O Plano de Disa/ }).click();
  const guide = page.locator('#quest-guide-disas_plot');
  await expect(guide).toHaveAttribute('open', '');
  await expect(guide).toContainText('entregue a carta a Brant');
  await expect(guide).not.toContainText('walkthroughs divergem');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('Harve: busca global abre Invasores Escamosos e mantém progresso intacto', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('Invasores Escamosos');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /Invasores Escamosos/ }).click();
  const guide = page.locator('#quest-guide-scaly_invaders');
  await expect(guide).toHaveAttribute('open', '');
  await expect(guide).toContainText('segundo grupo de sáurios');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('Bakbattahl: busca mobile encontra o assassino de Orações Ensombradas sem marcar progresso', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('Orações Ensombradas');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /Orações Ensombradas/ }).click();
  const entry = page.locator('#quest-guide-shadowed_prayers');
  await expect(entry).toHaveAttribute('open', '');
  await expect(entry).toContainText('braço direito');
  await expect(entry).toContainText('comando de agarrar');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('Bakbattahl: Jarle exige duas voltas envenenado e recebe veneno da quimera', async ({ page }) => {
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('Uma Proposta Venenosa');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /Uma Proposta Venenosa/ }).click();
  const entry = page.locator('#quest-guide-poisonous_proposal');
  await expect(entry).toHaveAttribute('open', '');
  await expect(entry).toContainText('Venin Harpy');
  await expect(entry).toContainText('cabeça de serpente');
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('Beren: biblioteca encontra as duas missões PT-BR no celular sem criar progresso', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('Treino Leonino');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /Treino Leonino/ }).click();
  const first = page.locator('#quest-guide-beren_claw');
  await expect(first).toHaveAttribute('open', '');
  await expect(first).toContainText('Humphrey');
  await expect(first).toContainText('três espadas');
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('A Última Lição de Beren');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /A Última Lição de Beren/ }).click();
  const second = page.locator('#quest-guide-beren_final_lesson');
  await expect(second).toHaveAttribute('open', '');
  await expect(second).toContainText('Arc of Might');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('Ilha Vulcânica: busca mobile abre a Fonte do Contentamento e indica pergaminho sem escrever progresso', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('A Fonte do Contentamento');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /A Fonte do Contentamento/ }).click();
  const entry = page.locator('#quest-guide-spring_thy_step');
  await expect(entry).toHaveAttribute('open', '');
  await expect(entry).toContainText('Gautstafr');
  await expect(entry).toContainText('Spellbow’s Paradox');
  await expect(entry).toContainText('Martyr’s Bolt');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('Ilha Vulcânica: busca encontra Lamond, máscara e Grandmaster’s Path', async ({ page }) => {
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('O Sábio Beberrão');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /O Sábio Beberrão/ }).click();
  const entry = page.locator('#quest-guide-sotted_sage');
  await expect(entry).toHaveAttribute('open', '');
  await expect(entry).toContainText('Newt Liqueur');
  await expect(entry).toContainText('Beastren Mask');
  await expect(entry).toContainText('Grandmaster’s Path');
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('Campanha final: buscar Um Novo Chamado Divino abre rota dos 15 cristais sem salvar progresso', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('Um Novo Chamado Divino');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /Um Novo Chamado Divino/ }).click();
  const entry = page.locator('#quest-guide-new_godsway');
  await expect(entry).toHaveAttribute('open', '');
  await expect(entry).toContainText('quinze Wyrmslife Crystals');
  await expect(entry).toContainText('Ambrosius');
  await expect(entry).toContainText('Unmaking Arrow');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('Campanha final: buscar O Guardião Gigantus indica fraquezas e diferença da conquista', async ({ page }) => {
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('O Guardião Gigantus');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /O Guardião Gigantus/ }).click();
  const entry = page.locator('#quest-guide-guardian_gigantus');
  await expect(entry).toHaveAttribute('open', '');
  await expect(entry).toContainText('Unmaking Arrow');
  await expect(entry).toContainText('balistas');
  await expect(entry).toContainText('objetivo separado');
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('Onda 8: fronteira de Battahl encontra os dois tipos de passe em 390px', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('Nação da Chama Luzente');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /Nação da Chama Luzente/ }).click();
  const entry = page.locator('#quest-guide-nation_lambent_flame');
  await expect(entry).toHaveAttribute('open', '');
  await expect(entry).toContainText('Beastren Border Entry Permit');
  await expect(entry).toContainText('Bermudo');
  await expect(entry).toContainText('Menella');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('Onda 8: busca mobile encontra Legado e distingue finais sem escrever progresso', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('Legado');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /Legado/ }).click();
  const entry = page.locator('#quest-guide-legacy');
  await expect(entry).toHaveAttribute('open', '');
  await expect(entry).toContainText('Pioneiro (Pathfinder)');
  await expect(entry).toContainText('Mundo Desancorado');
  await expect(entry).toContainText('Paz');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('itens por missão: Trysha mostra cinco origens e exige livros originais no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('Magia Vertiginosa');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /Magia Vertiginosa/ }).click();
  const entry = page.locator('#quest-guide-spellbound');
  await expect(entry).toHaveAttribute('open', '');
  const items = entry.getByRole('region', { name: 'Itens necessários e onde conseguir' });
  await expect(items.locator('li')).toHaveCount(5);
  for (const name of ['Fulminous Shield', 'Nation\'s Death Knell', 'Howling Blizzard', 'Towering Earth', 'Let There Be Light']) {
    await expect(items).toContainText(name);
  }
  await expect(items).toContainText('Dudley');
  await expect(items).toContainText('Wendy');
  await expect(items).toContainText('Waldhar');
  await expect(items).toContainText('preserve ou entregue o original');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('itens por missão: Myrddin apresenta traje e cada cópia no local correto', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('O Julgamento do Feiticeiro');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /O Julgamento do Feiticeiro/ }).click();
  const entry = page.locator('#quest-guide-sorcerers_appraisal');
  await expect(entry).toHaveAttribute('open', '');
  const items = entry.getByRole('region', { name: 'Itens necessários e onde conseguir' });
  await expect(items.locator('li')).toHaveCount(7);
  await expect(items).toContainText('Courtly Tunic + Courtly Breeches');
  await expect(items).toContainText('Fruminous Shield');
  await expect(items).toContainText('Hurling Blizzard');
  await expect(items).toContainText('Turquoise Ring');
  await expect(items).toContainText('faça/entregue uma cópia');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('busca global encontra itens de obtenção e falsificações da ficha', async ({ page }) => {
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('Waldhar');
  const results = page.getByRole('region', { name: 'Resultados encontrados' });
  await expect(results.getByRole('button', { name: /Magia Vertiginosa/ })).toBeVisible();
  await expect(results.getByRole('button', { name: /O Julgamento do Feiticeiro/ })).toBeVisible();
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('busca global por nome oficial PT-BR de item exibe detalhes e falsificação na ficha no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('Esfera de Jade');
  const results = page.getByRole('region', { name: 'Resultados encontrados' });
  await results.getByRole('button', { name: /Orbe de Jadeíta/ }).click();
  const entry = page.locator('#quest-guide-jadeite');
  await expect(entry).toHaveAttribute('open', '');
  const items = entry.getByRole('region', { name: 'Itens necessários e onde conseguir' });
  await expect(items).toContainText('Esfera de Jade / Esfera de Jaspe');
  await expect(items).toContainText('Posto do Retiro');
  await expect(items).toContainText('7.500 G');
  await expect(items).toContainText('Nome da cópia: Imitation Jadeite Orb (PT-BR: Esfera de Jaspe)');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});


test('Mundo Desancorado: Destinos Separados corrige local do peão no mobile sem salvar progresso', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('Destinos Separados');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /Destinos Separados/ }).click();
  const guide = page.locator('#quest-guide-dreams_apart');
  await expect(guide).toHaveAttribute('open', '');
  await expect(guide).toContainText('Laboratório de Pesquisa de Magia Proibida');
  await expect(guide).toContainText('Phaesus');
  await expect(guide).toContainText('NÃO no Santuário do Leito Marinho');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('Mundo Desancorado: Átrios reúne cinco evacuações e adverte sobre feixe final', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('Átrios da Primeira Aurora');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /Átrios da Primeira Aurora/ }).click();
  const guide = page.locator('#quest-guide-halls_first_dawn');
  await expect(guide).toHaveAttribute('open', '');
  await expect(guide).toContainText('VERMELHO FINAL');
  for (const destination of ['Vernworth', 'Bakbattahl', 'Jardim Sagrado', 'Acampamento da Ilha Vulcânica', 'Local de Escavação']) {
    await expect(guide).toContainText(destination);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('Mundo Desancorado: evacuação de Vernworth explica Disa e Allard sem item obrigatório', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('A Determinação do Príncipe Regente');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /A Determinação do Príncipe Regente/ }).click();
  const guide = page.locator('#quest-guide-regentkins_resolve');
  await expect(guide).toHaveAttribute('open', '');
  for (const npc of ['Brant', 'Sven', 'Disa', 'Allard']) await expect(guide).toContainText(npc);
  await expect(guide).toContainText('Não há item obrigatório');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('evacuação Bakbattahl: três conflitos e fruta condicional sem progresso salvo no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('Instabilidade Civil');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /Instabilidade Civil/ }).click();
  const guide = page.locator('#quest-guide-civil_unrest');
  await expect(guide).toHaveAttribute('open', '');
  for (const name of ['Menella', 'Nadinia', 'Scario', 'Nabrah', 'Glintt', 'Nomos', 'Grantt', 'Abba']) {
    await expect(guide).toContainText(name);
  }
  const items = guide.getByRole('region', { name: 'Itens necessários e onde conseguir' });
  await expect(items).toContainText('Fruta fresca');
  await expect(items).toContainText('opcional/condicional');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('evacuação Jardim Sagrado: diálogo alternativo e ramo opcional no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('Raízes Errantes');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /Raízes Errantes/ }).click();
  const guide = page.locator('#quest-guide-wandering_roots');
  await expect(guide).toHaveAttribute('open', '');
  await expect(guide).toContainText('Woodland Wordsmith');
  await expect(guide).toContainText('Rota alternativa');
  await expect(guide).toContainText('Arborheart Cutting');
  await expect(guide).toContainText('opcional/condicional');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('evacuação do Acampamento Vulcânico: teleporte é opcional e Henrique é missão distinta', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('A Importância de Ajudar Ernesto');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /A Importância de Ajudar Ernesto/ }).click();
  const guide = page.locator('#quest-guide-aiding_ernesto');
  await expect(guide).toHaveAttribute('open', '');
  await expect(guide).toContainText('Gautstafr');
  await expect(guide).toContainText('Cliodhna');
  await expect(guide).toContainText('Lamond');
  await expect(guide).toContainText('Pastor de Peões');
  const items = guide.getByRole('region', { name: 'Itens necessários e onde conseguir' });
  await expect(items.locator('li')).toHaveCount(2);
  await expect(items).toContainText('Não há item obrigatório');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('evacuação Local de Escavação: chave e Diminished Godsway obrigatórios no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('Pastor de Peões');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /Pastor de Peões/ }).click();
  const guide = page.locator('#quest-guide-shepherd_pawns');
  await expect(guide).toHaveAttribute('open', '');
  await expect(guide).toContainText('Henrique');
  await expect(guide).toContainText('Golem');
  const items = guide.getByRole('region', { name: 'Itens necessários e onde conseguir' });
  await expect(items.locator('li')).toHaveCount(2);
  await expect(items).toContainText('Overseer’s Lodge Key');
  await expect(items).toContainText('Diminished Godsway');
  await expect(items).toContainText('Nenhuma falsificação é necessária');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('Mundo Desancorado: A Missão dos Eruditos distingue feixe de Bakbattahl do final', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('A Missão dos Eruditos');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /A Missão dos Eruditos/ }).click();
  const guide = page.locator('#quest-guide-scholarly_pursuit');
  await expect(guide).toHaveAttribute('open', '');
  await expect(guide).toContainText('Phaesus');
  await expect(guide).toContainText('Laboratório de Pesquisa de Magia Proibida');
  await expect(guide).toContainText('feixe vermelho FINAL');
  const items = guide.getByRole('region', { name: 'Itens necessários e onde conseguir' });
  await expect(items).toContainText('Empowered Godsbane Blade');
  await expect(items).toContainText('Um Novo Chamado Divino');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('Mundo Desancorado: Quando as Vontades São Conflituantes conserva contingência de Talos', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('Quando as Vontades São Conflituantes');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /Quando as Vontades São Conflituantes/ }).click();
  const guide = page.locator('#quest-guide-when_wills_collide');
  await expect(guide).toHaveAttribute('open', '');
  await expect(guide).toContainText('Talos');
  await expect(guide).toContainText('Destinos Separados');
  await expect(guide).toContainText('Os guias divergem quanto ao gatilho exato');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('Carroça Fantasma: disfarce sem equipamentos e ordens para Brant acessíveis no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('A Carroça Fantasma');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /Guia de missão A Carroça Fantasma/ }).click();
  const guide = page.locator('#quest-guide-phantom_oxcart');
  await expect(guide).toHaveAttribute('open', '');
  for (const name of ['Navil', 'Brant', 'Bakbattahl', 'SEM armas nem armaduras']) {
    await expect(guide).toContainText(name);
  }
  const items = guide.getByRole('region', { name: 'Itens necessários e onde conseguir' });
  await expect(items).toContainText('Labor Requisition Orders');
  await expect(items).toContainText('Estalagem Stardrop');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('história principal inicial: quatro guias do prólogo a Vernworth abrem no celular sem gravar progresso', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  const cases = [
    ['O Despertar na Prisão', 'gaoled_awakening', 'grifo'],
    ['A História se Inicia', 'tales_beginning', 'Justinn'],
    ['No Rastro do Dragão', 'in_dragons_wake', 'Gregor'],
    ['O Trono do Sobran', 'seat_sovran', 'Brant']
  ];
  for (const [title, id, essential] of cases) {
    await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill(title);
    await page.getByRole('region', { name: 'Resultados encontrados' })
      .getByRole('button', { name: new RegExp('Guia de missão ' + title) }).click();
    const guide = page.locator('#quest-guide-' + id);
    await expect(guide).toHaveAttribute('open', '');
    await expect(guide).toContainText(essential);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('história principal: carta de Allard e cristal de Ambrosius aparecem na ficha da missão', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  const cases = [
    ['Um Encontro Perturbador', 'unsettling_encounter', 'Battahli-Crested Letter', 'Brant'],
    ['Sombras Trêmulas', 'flickering_shadows', 'Small Blue Crystal Shard', 'Ambrosius']
  ];
  for (const [title, id, required, recipient] of cases) {
    await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill(title);
    await page.getByRole('region', { name: 'Resultados encontrados' })
      .getByRole('button', { name: new RegExp('Guia de missão ' + title) }).click();
    const guide = page.locator('#quest-guide-' + id);
    await expect(guide).toHaveAttribute('open', '');
    const items = guide.getByRole('region', { name: 'Itens necessários e onde conseguir' });
    await expect(items).toContainText(required);
    await expect(items).toContainText(recipient);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});

test('Convergência: Rothais entrega lâmina e missão precede Um Novo Chamado Divino', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openConsultation(page);
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill('Convergência');
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: /Guia de missão Convergência/ }).click();
  const guide = page.locator('#quest-guide-convergence');
  await expect(guide).toHaveAttribute('open', '');
  await expect(guide).toContainText('Rothais');
  await expect(guide).toContainText('Dulled Godsbane Blade');
  await expect(guide).toContainText('Um Novo Chamado Divino');
  await expect(guide).toContainText('NÃO é a sequência de evacuação');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(k => localStorage.getItem(k), savedKey)).toBeNull();
});
