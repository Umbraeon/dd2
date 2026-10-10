// Browser-only provider integration probe (no scraping, no protected data extraction).
// Creates a first-party iframe just as the Compêndio would, without changing the app.
// Does NOT assert provider authorization; legal and product review remain separate.
import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
const ORIGIN = 'http://127.0.0.1:3001/';
const URL = 'https://mapgenie.io/dragons-dogma-2/maps/world?embed=light';
mkdirSync('test-results/screenshots', { recursive: true });
const browser = await chromium.launch({headless:true});
const report = { testedAt:new Date().toISOString(), url:URL, checks:[], responses:[], failures:[], consoleErrors:[], verdict:'unverified' };
for (const [width,height] of [[390,844],[1440,900]]) {
 const page = await browser.newPage({viewport:{width,height}});
 const sample = {viewport:`${width}x${height}`, iframeUrl:null, mapSurfaceCount:0, interactiveControlCount:0, screenshot:null};
 page.on('response', response => {
   if (!response.url().startsWith('https://mapgenie.io/dragons-dogma-2/maps/world')) return;
   const headers = response.headers();
   report.responses.push({viewport:sample.viewport,status:response.status(),url:response.url(),xFrameOptions:headers['x-frame-options']||null,csp:headers['content-security-policy']||null});
 });
 page.on('requestfailed', request => {
   if (request.url().includes('mapgenie.io')) report.failures.push({viewport:sample.viewport,url:request.url(),failure:request.failure()?.errorText||'unknown'});
 });
 page.on('console', message => {
   if (message.type()==='error' && /mapgenie|frame|refused to connect|blocked by/i.test(message.text()))
     report.consoleErrors.push({viewport:sample.viewport,error:message.text().slice(0,280)});
 });
 try {
   await page.goto(ORIGIN,{waitUntil:'domcontentloaded',timeout:12000});
   await page.evaluate(src=>{
     const overlay=document.createElement('div'); overlay.style.cssText='position:fixed;inset:0;z-index:9999;background:#141414;';
     const frame=document.createElement('iframe');frame.title='MapGenie DD2 — prova de incorporação';frame.src=src;
     frame.style.cssText='width:100%;height:100%;border:0;';
     overlay.append(frame);document.body.append(overlay);
   }, URL);
   await page.waitForTimeout(13500);
   const iframe=page.locator('iframe[title="MapGenie DD2 — prova de incorporação"]');
   const frame=page.frames().find(f=>f.url().startsWith('https://mapgenie.io/dragons-dogma-2/'));
   sample.iframeUrl=frame?.url()||null;
   if(frame){
     try {
       sample.mapSurfaceCount=await frame.locator('.leaflet-container, .mapboxgl-map, canvas').count();
       sample.interactiveControlCount=await frame.locator('button, input, [role="button"]').count();
     } catch(e){sample.frameInspectionError=String(e).slice(0,160);}
   }
   sample.screenshot=`test-results/screenshots/pr-d-provider-probe-${width}x${height}.png`;
   await page.screenshot({path:sample.screenshot});
   if(frame && sample.mapSurfaceCount>0) {
     await iframe.hover();await page.mouse.wheel(0,-300);
     await page.waitForTimeout(1300);
     await page.screenshot({path:`test-results/screenshots/pr-d-provider-after-zoom-${width}x${height}.png`});
   }
 } catch(e) { sample.error=String(e).slice(0,270); }
 report.checks.push(sample); await page.close();
}
await browser.close();
report.verdict=report.checks.some(x=>x.mapSurfaceCount>0) ? 'technical-surface-observed-not-authorization' : 'not-verified-or-blocked';
writeFileSync('test-results/mapgenie-probe.json', JSON.stringify(report,null,2));
console.log('MAPGENIE_EMBED_DIAGNOSTIC='+JSON.stringify(report));
