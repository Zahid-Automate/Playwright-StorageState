import { test, expect } from '@playwright/test';

test.use({ storageState: './storageState.json' });

test.describe('My Account Login Test', () => {
  test('validate my account page', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/account'); // correct logged-in page
    await expect(page.locator('[data-test="nav-menu"]')).toBeVisible();
    expect(await page.locator('[data-test="nav-menu"]').innerText()).toContain('Mohammed A Zahid');
    expect(await page.locator('[data-test="page-title"]').innerText()).toContain('My account');
    expect(await page.locator('[data-test="nav-favorites"]').innerText()).toContain('Favorites');
  });
});
