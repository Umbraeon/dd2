import { test, expect } from '@playwright/test';

const key='dd2_roadmap_user_progress_v3';
const show=async(page: import('@playwright/test').Page,title:string,id:string)=>{
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
const noProgressWrite=async(page:import('@playwright/test').Page)=>{
  expect(await page.evaluate(k=>localStorage.getItem(k),key)).toBeNull();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1)).toBe(true);
};

test('escultor: Medusa opcional e recompensa diferente no mobile',async({page})=>{
  const guide=await show(page,'A Inspiração de um Escultor','case_sculptors_block');
  for(const x of ['Fulvio','Klark','Medusa','OPCIONAL','14.000 G']) await expect(guide).toContainText(x);
  const items=guide.getByRole('region',{name:'Itens necessários e onde conseguir'});
  await expect(items.locator('li')).toHaveCount(1);
  await expect(items).toContainText('Preserved Medusa Head');
  await noProgressWrite(page);
});

test('baile: bastão Paragon e escolha de descarte sem omitir captura',async({page})=>{
  const guide=await show(page,'Uma Nobre Troca','noble_exchange');
  for(const x of ['Paragon Staff','Olven','Descartar','60.000 G','Neoseeker']) await expect(guide).toContainText(x);
  const items=guide.getByRole('region',{name:'Itens necessários e onde conseguir'});
  await expect(items.locator('li')).toHaveCount(1);
  await noProgressWrite(page);
});

test('Entre Dois Fogos: cartas distintas para Ernesto e Barbas',async({page})=>{
  const guide=await show(page,'Entre Dois Fogos','twixt_rock_hard_place');
  for(const x of ['Akakios','Ernesto','Barbas','morgue','Ferrystone']) await expect(guide).toContainText(x);
  const items=guide.getByRole('region',{name:'Itens necessários e onde conseguir'});
  await expect(items.locator('li')).toHaveCount(2);
  await noProgressWrite(page);
});

test('Nadinia: fugitivo recusado para evitar prisão, sem objeto inventariado',async({page})=>{
  const guide=await show(page,'Cruzando às Sombras','crossing_shadow');
  for(const x of ['Vera','Nadinia','RECUSAR','1.000 G','Como uma Vela na Tempestade']) await expect(guide).toContainText(x);
  await expect(guide.getByRole('region',{name:'Itens necessários e onde conseguir'})).toHaveCount(0);
  await noProgressWrite(page);
});
