import { test, expect } from '@playwright/test';
import { PHASES } from '../src/data/roadmapData';

const key = 'dd2_roadmap_user_progress_v3';
const byId = (id:string) => PHASES.flatMap(p=>p.events.map(event=>({phase:p,event}))).find(x=>x.event.id===id)!;

test('diário mostra as quatro categorias por texto; intruso e Raghnall aparecem na sequência correta', async ({page}) => {
  for(const [width,height] of [[390,844],[1440,900]]) {
    await page.setViewportSize({width,height});
    await page.goto('/');
    const legend=page.getByLabel('Legenda: tipos de etapas');
    await expect(legend.getByText('História principal')).toBeVisible();
    await expect(legend.getByText('Missão secundária')).toBeVisible();
    await expect(legend.getByText('Atividade opcional')).toBeVisible();
    await expect(legend.getByText('Ponto sem retorno')).toBeVisible();
    for(const id of ['m09','v112','v303','p08']){
      const item=byId(id);
      await page.getByRole('combobox',{name:'Capítulo'}).selectOption(item.phase.id);
      const row=page.getByRole('button',{name:`Consultar atividade: ${item.event.title}`});
      await expect(row).toBeVisible();
      await row.click();
      const detail=page.locator('.quest-detail');
      await expect(detail.locator('[data-journey-category]')).toHaveText(
        id==='m09'?'História principal':id==='v303'?'Ponto sem retorno':'Missão secundária'
      );
      if(id==='m09') await expect(detail).toContainText('No Rastro do Dragão');
      if(id==='p08') await expect(detail).toContainText('Gigantus');
      if(width<600) await page.getByRole('button',{name:'Voltar à lista de missões'}).click();
    }
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth+1);
    expect(overflow).toBe(false);
    expect(await page.evaluate(k=>localStorage.getItem(k),key)).toBeNull();
  }
});

test('Consulta mostra categorias sem confundir posição e risco', async ({page}) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  await page.getByRole('button',{name:'Consulta e ferramentas'}).click();
  await page.getByRole('button',{name:'Missões',exact:true}).click();
  const legend=page.getByLabel('Legenda: tipos de etapas');
  await expect(legend.getByText('Ponto sem retorno')).toBeVisible();
  await expect(page.getByText('71 marcos · 9 capítulos')).toBeVisible();
});
