import { test, expect } from '@playwright/test';

const key='dd2_roadmap_user_progress_v3';
const show = async (page: import('@playwright/test').Page, title: string, id: string) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  await page.getByRole('button',{name:'Consulta e ferramentas'}).click();
  await page.getByRole('searchbox',{name:'Buscar em todos os 9 capítulos'}).fill(title);
  await page.getByRole('region',{name:'Resultados encontrados'})
    .getByRole('button',{name:new RegExp('Guia de missão '+title)}).click();
  const guide=page.locator('#quest-guide-'+id);
  await expect(guide).toHaveAttribute('open','');
  return guide;
};
const unchanged=async (page: import('@playwright/test').Page) => {
  expect(await page.evaluate(k=>localStorage.getItem(k),key)).toBeNull();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1)).toBe(true);
};

test('Sven: identificar Patrick e três itens antes de entregar carta única',async({page})=>{
  const guide=await show(page,'Correspondência Mascarada','masked_correspondence');
  for(const x of ['catálogo Kiranico PT-BR','Lord Patrick','capa AZUL','Sven','Unfinished Letter']) await expect(guide).toContainText(x);
  const items=guide.getByRole('region',{name:'Itens necessários e onde conseguir'});
  await expect(items.locator('li')).toHaveCount(3);
  for(const x of ['Letter to Lord Patrick','Courtly Tunic','Eventide Mask']) await expect(items).toContainText(x);
  await unchanged(page);
});

test('Welcome: dupla rota, Taleef e Fruit Wine de recompensa',async({page})=>{
  const guide=await show(page,'De Volta a Battahl','welcome_battahl');
  for(const x of ['Raghnall','Roger','Taleef','Fruit Wine','13.500 G']) await expect(guide).toContainText(x);
  await expect(guide.getByRole('region',{name:'Itens necessários e onde conseguir'})).toHaveCount(0);
  await unchanged(page);
});

test('Tensions: Simon, Augustin, caverna e dois lados sem inventário',async({page})=>{
  const guide=await show(page,'Tensão na Estrada','tensions_highroad');
  for(const x of ['Simon','Augustin','Raghnall','Caverna Guerco','duas rotas']) await expect(guide).toContainText(x);
  await unchanged(page);
});

test('Clash: confronto é condicional e reviver Raghnall não é obrigação',async({page})=>{
  const guide=await show(page,'Confronto Final','clash_conclusion');
  for(const x of ['CONDICIONAL','Raghnall','Torre do Luar','Wakestone','Taleef']) await expect(guide).toContainText(x);
  await unchanged(page);
});
