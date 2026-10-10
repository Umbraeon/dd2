import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync } from 'node:fs';
import { PHASES } from '../src/data/roadmapData';

const KEY='dd2_roadmap_user_progress_v3';
const MAP='https://mapgenie.io/dragons-dogma-2/maps/world';
const EMBED=MAP+'?embed=light';
const state=()=>({
  version:'3.0.0',updatedAt:'2026-01-01T00:00:00.000Z',
  steps:{} as Record<string,boolean>,achievements:{} as Record<number,boolean>,
  sphinx:{},firstTokenLocation:'',seekerTokensCount:0,
  barbecue:{},maisters:{},confirmedCheckpoints:{}
});
const stored=(page:Page)=>page.evaluate(key=>localStorage.getItem(key),KEY);
const mapDialog=(page:Page)=>page.getByRole('dialog',{name:'Mapa de Mementos do Buscador'});
const tokensModal=(page:Page)=>page.locator('.fixed.inset-0.z-50');
const mapTrigger=(page:Page)=>page.getByRole('button',{name:'Ver mapa interativo'});
async function openTokens(page:Page) {
  await page.getByRole('button',{name:'Abrir central de ferramentas'}).click();
  await page.getByRole('region',{name:'Central de Ferramentas'})
    .getByRole('button',{name:/^Mementos do Buscador/}).click();
  await expect(tokensModal(page).getByRole('heading',{name:/Mementos do Buscador · 80 Tokens/})).toBeVisible();
}
async function simulateProvider(page:Page) {
  await page.route(EMBED,route=>route.fulfill({
    status:200, contentType:'text/html',
    body:'<!doctype html><html><body style="margin:0;background:#c8c2b4"><main style="min-height:100vh;padding:18px"><h1>Simulação de integração — não é MapGenie</h1><button>Zoom +</button><div style="height:500px">Área de teste</div></main></body></html>'
  }));
}

test('sem requisição MapGenie inicial; abriu apenas após ação explícita',async({page})=>{
  const requests:string[]=[];
  page.on('request',r=>{if(r.url().startsWith(EMBED))requests.push(r.url());});
  await simulateProvider(page);
  await page.goto('/');
  expect(requests).toHaveLength(0);
  expect(await stored(page)).toBeNull();
  await openTokens(page);
  expect(requests).toHaveLength(0);
  await expect(mapTrigger(page)).toBeVisible();
  await expect(tokensModal(page).getByRole('link',{name:/Abrir mapa no MapGenie/})).toHaveAttribute('href',MAP);
  await mapTrigger(page).click();
  await expect(mapDialog(page)).toBeVisible();
  await expect(mapDialog(page).locator('iframe')).toHaveAttribute('src',EMBED);
  await expect(mapDialog(page).locator('iframe')).toHaveAttribute('title',/Mapa interativo de Mementos do Buscador/);
  await expect.poll(()=>requests.length).toBe(1);
  await expect(tokensModal(page)).toHaveCount(0);
  await expect(mapDialog(page).getByRole('button',{name:'Voltar aos Mementos'})).toBeFocused();
  expect(await stored(page)).toBeNull();
});

test('mapa retorna ao contador, foco do botão, Escape e Esfinge compartilham registro',async({page})=>{
  await simulateProvider(page);
  await page.goto('/');
  await openTokens(page);
  const notes='Primeiro memento perto da ponte — verificação de mapa';
  await tokensModal(page).locator('textarea').first().fill(notes);
  await tokensModal(page).getByRole('button',{name:'+5',exact:true}).click();
  await expect.poll(async()=>JSON.parse((await stored(page))!).seekerTokensCount).toBe(5);
  const before=await stored(page);
  await mapTrigger(page).focus();
  await page.keyboard.press('Enter');
  await expect(mapDialog(page)).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(mapDialog(page)).toBeHidden();
  await expect(mapTrigger(page)).toBeFocused();
  await expect(tokensModal(page).locator('textarea').first()).toHaveValue(notes);
  await expect(tokensModal(page)).toContainText('5 / 80 Coletados');
  expect(await stored(page)).toBe(before);
  await mapTrigger(page).click();
  await mapDialog(page).getByRole('button',{name:'Voltar aos Mementos'}).click();
  await expect(mapTrigger(page)).toBeFocused();
  expect(await stored(page)).toBe(before);
  await tokensModal(page).locator('button[title="Fechar"]').click();
  await expect(page.getByRole('button',{name:'Abrir central de ferramentas'})).toBeFocused();
  await page.getByRole('button',{name:'Abrir central de ferramentas'}).click();
  await page.getByRole('region',{name:'Central de Ferramentas'}).getByRole('button',{name:/^Esfinge/}).click();
  await expect(tokensModal(page).locator('textarea').first()).toHaveValue(notes);
  const data=JSON.parse((await stored(page))!);
  expect(data.seekerTokensCount).toBe(5);
  expect(data.firstTokenLocation).toBe(notes);
});

test('falha externa não esconde fallback; marcações dos dois serviços são independentes',async({page})=>{
  await page.route(EMBED,route=>route.abort('failed'));
  await page.goto('/');
  await openTokens(page);
  await mapTrigger(page).click();
  await expect(mapDialog(page)).toBeVisible();
  await expect(mapDialog(page).getByRole('link',{name:'Abrir no MapGenie'})).toHaveAttribute('href',MAP);
  await expect(mapDialog(page).getByRole('link',{name:'Abrir mapa no MapGenie'})).toHaveAttribute('target','_blank');
  await expect(mapDialog(page)).toContainText('independentes do contador do Compêndio');
  expect(await stored(page)).toBeNull();
  await mapDialog(page).getByRole('button',{name:'Voltar aos Mementos'}).click();
  await expect(mapTrigger(page)).toBeFocused();
});

test('navegação mantém Diário, Consulta e backup v3 existentes',async({page})=>{
  await simulateProvider(page);
  const original=state();const event=PHASES[0].events[0];
  original.steps[event.id]=true;
  await page.addInitScript(({key,data})=>{
    if(localStorage.getItem(key)===null)localStorage.setItem(key,JSON.stringify(data));
  },{key:KEY,data:original});
  await page.goto('/');
  const before=await stored(page);
  await openTokens(page);
  await mapTrigger(page).click();
  await mapDialog(page).getByRole('button',{name:'Voltar aos Mementos'}).click();
  await tokensModal(page).locator('button[title="Fechar"]').click();
  expect(await stored(page)).toBe(before);
  await page.getByRole('button',{name:'Consulta e ferramentas'}).click();
  await expect(page.getByRole('searchbox',{name:'Buscar em todos os 9 capítulos'})).toBeVisible();
  await page.getByRole('button',{name:'Voltar ao Diário'}).click();
  await expect(page.getByRole('heading',{name:'Diário do Nascen'})).toBeVisible();
  await page.getByRole('button',{name:'Backup do progresso'}).click();
  await expect(page.getByRole('heading',{name:/Gerenciamento & Backup/})).toBeVisible();
  expect(await stored(page)).toBe(before);
});

test('quatro resoluções Chromium: área de mapa ampla, sem overflow, foco, axe e capturas UI simuladas',async({page},testInfo)=>{
  test.setTimeout(110000);
  mkdirSync('test-results/screenshots',{recursive:true});
  await simulateProvider(page);
  for(const [w,h] of [[375,812],[390,844],[1440,900],[1920,1080]]){
    await page.setViewportSize({width:w,height:h});
    await page.goto('/');
    await openTokens(page);
    await page.screenshot({path:`test-results/screenshots/pr-d-ui-simulated-tracker-${w}x${h}.png`,fullPage:false});
    await mapTrigger(page).click();
    await expect(mapDialog(page)).toBeVisible();
    const {width,height}=await page.locator('.tokens-map-frame').evaluate(node=>{
      const rect=node.getBoundingClientRect();return {width:rect.width,height:rect.height};
    });
    expect(width).toBeGreaterThan(w-5);
    expect(height,'área útil muito pequena em '+w).toBeGreaterThan(h*.5);
    await expect(mapDialog(page).getByRole('button',{name:'Voltar aos Mementos'})).toBeFocused();
    await page.screenshot({path:`test-results/screenshots/pr-d-ui-simulated-map-${w}x${h}.png`,fullPage:false});
    const violations=await new AxeBuilder({page}).include('.tokens-map-dialog').analyze();
    await testInfo.attach('axe-pr-d-'+w+'.json',{
      body:Buffer.from(JSON.stringify(violations.violations,null,2)),contentType:'application/json'
    });
    expect(violations.violations.filter(v=>v.impact==='serious'||v.impact==='critical')).toEqual([]);
    const scroll=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:document.documentElement.clientWidth}));
    expect(scroll.scroll).toBeLessThanOrEqual(scroll.width+1);
    await page.keyboard.press('Escape');
    await expect(mapTrigger(page)).toBeFocused();
    await page.screenshot({path:`test-results/screenshots/pr-d-ui-simulated-return-focus-${w}x${h}.png`,fullPage:false});
    await tokensModal(page).locator('button[title="Fechar"]').click();
    expect(await stored(page)).toBeNull();
  }
});
