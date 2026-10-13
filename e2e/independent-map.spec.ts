import { test, expect } from '@playwright/test';
import { mkdirSync } from 'node:fs';

test.describe('Mapa independente B03 — cavernas e mementos', () => {
  test.beforeEach(async () => {
    mkdirSync('test-results/screenshots', {recursive:true});
  });

  test('carrega arte 8K, panorama sem emendas e fontes de marcadores', async ({page}) => {
    await page.goto('/');
    const before = await page.evaluate(() => localStorage.getItem('dd2_roadmap_user_progress_v3'));
    await page.getByRole('button',{name:'Abrir mapa independente'}).click();
    const dialog = page.locator('dialog.independent-map-dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('240 Mementos do Buscador e 37 entradas')).toBeVisible();
    await expect(dialog.getByRole('button',{name:'Mapa do jogo (8K · tiles)'})).toBeVisible();

    const manifestResponse=await page.request.get('/map-tiles/metadata.json');
    expect(manifestResponse.ok()).toBeTruthy();
    expect(await manifestResponse.json()).toMatchObject({
      source:'world-map-8k.webp',sourceWidth:8192,sourceHeight:8192,maxNativeZoom:2,tileCount:1365
    });
    const image=page.locator('.leaflet-image-layer[src*="/map-tiles/overview.webp"]');
    await expect(image).toBeVisible();
    await expect.poll(()=>image.evaluate((img:HTMLImageElement)=>img.naturalWidth)).toBe(2048);
    await expect(page.locator('.leaflet-tile-pane img[src*="/map-tiles/"]')).toHaveCount(0);

    await expect(dialog.locator('.dd2-cave-pin').first()).toBeVisible();
    await expect(dialog.locator('.dd2-token-cluster').first()).toBeVisible();
    await page.screenshot({path:'test-results/screenshots/00-b03-map-overview.png'});

    await dialog.getByRole('button',{name:'Voltar'}).click();
    await expect(dialog).not.toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('dd2_roadmap_user_progress_v3'))).toBe(before);
  });

  test('37 entradas de cavernas, busca e referência de origem', async ({page}) => {
    await page.goto('/');
    await page.getByRole('button',{name:'Abrir mapa independente'}).click();
    const dialog=page.locator('dialog.independent-map-dialog');
    await dialog.getByRole('button',{name:'Alternar filtros'}).click();
    await expect(dialog.getByText('37',{exact:true})).toBeVisible();
    await dialog.getByRole('searchbox',{name:'Buscar no mapa'}).first().fill('Gruta de Drabnir');
    await expect(dialog.locator('.dd2-cave-pin')).toHaveCount(2);
    await dialog.locator('.dd2-cave-pin').first().click({force:true});
    const drawer=dialog.locator('aside');
    await expect(drawer).toBeVisible();
    await expect(drawer).toContainText('ENTRADA REFERENCIADA');
    await expect(drawer.getByRole('link',{name:'Conferir fonte da localização'})).toHaveAttribute('href',/gamerguides.com/);
    await page.screenshot({path:'test-results/screenshots/01-b03-cave-detail.png'});
  });

  test('240 Mementos por GUID, clusters que se separam no zoom', async ({page}) => {
    await page.goto('/');
    await page.getByRole('button',{name:'Abrir mapa independente'}).click();
    const dialog=page.locator('dialog.independent-map-dialog');
    await dialog.getByRole('button',{name:'Alternar filtros'}).click();
    await expect(dialog.getByText('240',{exact:true})).toBeVisible();
    await dialog.getByRole('searchbox',{name:'Buscar no mapa'}).first().fill('Memento do Buscador 001');
    const token=dialog.locator('.dd2-token-pin');
    await expect(token).toHaveCount(1);
    await token.click({force:true});
    const drawer=dialog.locator('aside');
    await expect(drawer).toContainText('COORDENADA DO JOGO');
    await expect(drawer).toContainText('GUID');
    await expect(drawer.getByRole('link',{name:'Conferir fonte da localização'})).toHaveAttribute('href',/github.com\/frostmx\/dd2-map/);
    await page.screenshot({path:'test-results/screenshots/02-b03-token-detail.png'});
  });

  test('zoom 8K nativo sem upscale e troca da nitidez', async ({page}) => {
    await page.goto('/');
    await page.getByRole('button',{name:'Abrir mapa independente'}).click();
    const dialog=page.locator('dialog.independent-map-dialog');
    const zoomIn=dialog.locator('.leaflet-control-zoom-in');
    await expect(zoomIn).toBeVisible();
    for(let i=0;i<18;i++){
      if(await zoomIn.getAttribute('aria-disabled')==='true') break;
      await zoomIn.click();
      await page.waitForTimeout(350);
    }
    await expect(zoomIn).toHaveAttribute('aria-disabled','true');
    const enhanced=dialog.locator('.leaflet-tile-pane img[src*="/map-tiles/enhanced/2/"]');
    await expect(enhanced.first()).toBeVisible();
    await expect.poll(()=>enhanced.first().evaluate((img:HTMLImageElement)=>img.naturalWidth)).toBe(256);
    await dialog.getByRole('button',{name:'Usar nitidez original'}).click();
    await expect(dialog.locator('.leaflet-tile-pane img[src*="/map-tiles/2/"]').first()).toBeVisible();
    await dialog.getByRole('button',{name:'Ativar nitidez aprimorada'}).click();
    await expect(enhanced.first()).toBeVisible();
    await expect(dialog.locator('.leaflet-tile-pane img[src*="/map-tiles/3/"]')).toHaveCount(0);
    await page.screenshot({path:'test-results/screenshots/03-b03-native-zoom.png'});
  });

  test('mobile: cavernas, mementos e filtros sem overflow',async ({page})=>{
    await page.setViewportSize({width:390,height:844});
    await page.goto('/');
    await page.getByRole('button',{name:'Abrir mapa independente'}).click();
    const dialog=page.locator('dialog.independent-map-dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.locator('.dd2-cave-pin').first()).toBeVisible();
    await expect(dialog.getByRole('button',{name:'Ocultar localizações'})).toBeVisible();
    await dialog.getByRole('button',{name:'Alternar filtros'}).click();
    await expect(dialog.getByRole('region',{name:'Filtros de marcadores'})).toBeVisible();
    await expect(dialog.getByRole('searchbox',{name:'Buscar no mapa'})).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBe(true);
    await page.screenshot({path:'test-results/screenshots/04-b03-mobile.png'});
    await dialog.getByRole('button',{name:'Ocultar localizações'}).click();
    await expect(dialog.locator('.dd2-cave-pin')).toHaveCount(0);
    await dialog.getByRole('button',{name:'Mostrar localizações'}).click();
    await expect(dialog.locator('.dd2-cave-pin').first()).toBeVisible();
  });
});
