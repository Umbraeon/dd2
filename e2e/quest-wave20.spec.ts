import { test, expect } from '@playwright/test';

const KEY='dd2_roadmap_user_progress_v3';

async function findGuide(page: import('@playwright/test').Page, title: string, id: string) {
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  await page.getByRole('button',{name:'Consulta e ferramentas'}).click();
  await page.getByRole('searchbox',{name:'Buscar em todos os 9 capítulos'}).fill(title);
  await page.getByRole('region',{name:'Resultados encontrados'})
    .getByRole('button',{name:new RegExp('Guia de missão '+title)}).click();
  const guide=page.locator('#quest-guide-'+id);
  await expect(guide).toHaveAttribute('open','');
  expect(await page.evaluate(key=>localStorage.getItem(key),KEY)).toBeNull();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1)).toBe(true);
  return guide;
}

test('prólogo: ficha A Mão que Guia esclarece combater e fugir sem criar progresso',async({page})=>{
  const details=await findGuide(page,'A Mão que Guia','hand_that_guides');
  await expect(details).toContainText('Defenda-se do monstro');
  await expect(details).toContainText('Fuja para viver');
  await expect(details).toContainText('A História se Inicia');
  await expect(details.getByRole('region',{name:'Itens necessários e onde conseguir'})).toHaveCount(0);
});

test('estrada: Intruso de um Olho Só orienta ciclope, catarata opcional e Gregor',async({page})=>{
  const details=await findGuide(page,'Intruso de um Olho Só','one_eyed_interloper');
  await expect(details).toContainText('cachoeira');
  await expect(details).toContainText('OPCIONAL');
  await expect(details).toContainText('Gregor');
  await expect(details).toContainText('Missive to the Captain');
  await expect(details.getByRole('region',{name:'Itens necessários e onde conseguir'})).toHaveCount(0);
});
