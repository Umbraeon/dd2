import { test, expect } from '@playwright/test';

const key = 'dd2_roadmap_user_progress_v3';
const open = async (page: import('@playwright/test').Page, query: string, title: RegExp) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Consulta e ferramentas' }).click();
  await page.getByRole('searchbox', { name: 'Buscar em todos os 9 capítulos' }).fill(query);
  await page.getByRole('region', { name: 'Resultados encontrados' })
    .getByRole('button', { name: title }).click();
};

test('Esfinge: enigmas, prazo e três itens visíveis sem alterar progresso v3', async ({page}) => {
  await open(page,'Um Jogo de Perspicácia',/Guia de missão Um Jogo de Perspicácia/);
  const guide=page.locator('#quest-guide-game_of_wits');
  await expect(guide).toHaveAttribute('open','');
  for(const text of ['SETE DIAS','REUNIÃO','Memória','Unmaking Arrow','Arqueiro'])
    await expect(guide).toContainText(text);
  const items=guide.getByRole('region',{name:'Itens necessários e onde conseguir'});
  await expect(items.locator('li')).toHaveCount(3);
  await expect(items).toContainText("Finder's Token");
  await expect(items).toContainText('Sealing Phial');
  expect(await page.evaluate(k=>localStorage.getItem(k),key)).toBeNull();
});

test('Oskar: nome EN honesto, item condicional e sino aparecem no mobile', async ({page}) => {
  await open(page,'Tolled to Rest',/Guia de missão Tolled to Rest/);
  const guide=page.locator('#quest-guide-tolled_to_rest');
  await expect(guide).toHaveAttribute('open','');
  for(const text of ['PT-BR NÃO CONFIRMADO','Oskar','Campo de Batalha Antigo','Ancient Battleground Key'])
    await expect(guide).toContainText(text);
  await expect(guide.getByRole('region',{name:'Itens necessários e onde conseguir'})).toContainText("Nation's Death Knell");
  expect(await page.evaluate(()=>document.documentElement.scrollWidth <= document.documentElement.clientWidth+1)).toBe(true);
  expect(await page.evaluate(k=>localStorage.getItem(k),key)).toBeNull();
});
