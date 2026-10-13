import { test, expect } from '@playwright/test';
import { mkdirSync } from 'node:fs';

test.describe('Mapa Interativo Independente (Missão B01)', () => {
  test.beforeEach(async () => {
    mkdirSync('test-results/screenshots', { recursive: true });
  });

  test('deve abrir o mapa a partir da Central de Ferramentas e exibir interface funcional', async ({ page }) => {
    await page.goto('/');

    // 1. Storage check before opening
    const storageBefore = await page.evaluate(() => localStorage.getItem('dd2_roadmap_user_progress_v3'));

    // 2. Open Independent Map
    const mapHeaderBtn = page.getByRole('button', { name: 'Abrir mapa independente' });
    await expect(mapHeaderBtn).toBeVisible();
    await mapHeaderBtn.click();

    // 4. Map dialog should be visible
    const mapDialog = page.locator('dialog.independent-map-dialog');
    await expect(mapDialog).toBeVisible();
    await expect(page.locator('#independent-map-title')).toContainText('Mapa Interativo Independente');

    // 5. Leaflet surface check
    const leafletMap = page.locator('.leaflet-container');
    await expect(leafletMap).toBeVisible();

    // 6. Pins should be rendered
    const pins = page.locator('.custom-map-pin');
    await expect(pins.first()).toBeVisible();
    const pinCount = await pins.count();
    expect(pinCount).toBeGreaterThan(0);
    // Screenshot 1: Desktop Initial Map
    await page.screenshot({ path: 'test-results/screenshots/01-desktop-initial-map.png' });

    // 7. Click on a marker to test selection drawer
    await page.locator('.leaflet-marker-icon').first().click({ force: true });
    const detailDrawer = mapDialog.locator('aside');
    await expect(detailDrawer).toBeVisible();
    await expect(detailDrawer).toContainText('Mundo (X, Y, Z):');
    await expect(detailDrawer).toContainText('Pixel 2D (MapX, MapY):');
    await expect(detailDrawer).toContainText('UNVERIFIED');

    // Screenshot 2: Marker Details
    await page.screenshot({ path: 'test-results/screenshots/02-desktop-marker-detail.png' });

    // 8. Test Layer Switcher
    const schematicBtn = page.getByRole('button', { name: 'Esquema' });
    await schematicBtn.click();
    await page.waitForTimeout(500);

    // Screenshot 3: Schematic Layer
    await page.screenshot({ path: 'test-results/screenshots/03-desktop-schematic-layer.png' });

    // Switch back
    await page.getByRole('button', { name: 'Oficial (8K)' }).click();

    // 9. Close dialog and verify storage preservation
    await page.getByRole('button', { name: 'Voltar', exact: true }).click();
    await expect(mapDialog).not.toBeVisible();

    const storageAfter = await page.evaluate(() => localStorage.getItem('dd2_roadmap_user_progress_v3'));
    expect(storageAfter).toBe(storageBefore);
  });

  test('deve abrir o guia por ID sem busca textual intermediária', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Abrir mapa independente' }).click();
    await page.locator('.leaflet-marker-icon').first().click({ force: true });
    const link = page.getByRole('button', { name: 'Ver Guia no Compêndio' });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page.getByRole('heading', { name: 'Guias de missões e falsificações' })).toBeVisible();
    await expect(page.locator('dialog.independent-map-dialog')).not.toBeVisible();
  });

  test('deve funcionar em viewport mobile (390x844) com controles táteis e responsivos', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    // Open Independent Map
    const mapHeaderBtn = page.getByRole('button', { name: 'Abrir mapa independente' });
    await expect(mapHeaderBtn).toBeVisible();
    await mapHeaderBtn.click();

    const mapDialog = page.locator('dialog.independent-map-dialog');
    await expect(mapDialog).toBeVisible();

    // Screenshot 4: Mobile View
    await page.screenshot({ path: 'test-results/screenshots/04-mobile-initial-view.png' });

    // Verify pins visible on mobile
    const pins = page.locator('.custom-map-pin');
    await expect(pins.first()).toBeVisible();

    // Click pin on mobile
    await page.locator('.leaflet-marker-icon').first().click({ force: true });
    const detailDrawer = mapDialog.locator('aside');
    await expect(detailDrawer).toBeVisible();

    // Screenshot 5: Mobile Marker Detail
    await page.screenshot({ path: 'test-results/screenshots/05-mobile-marker-detail.png' });

    // Close
    await page.getByRole('button', { name: 'Voltar', exact: true }).click();
    await expect(mapDialog).not.toBeVisible();
  });
});
