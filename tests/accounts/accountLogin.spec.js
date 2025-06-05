import { test, expect } from '@playwright/test';

test.use({ storageState: './auth/storageState.json' });

test.describe('My Account Login Test', () => {
  test('Validate my account page', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/account'); // correct logged-in page
    await expect(page.locator('[data-test="nav-menu"]')).toBeVisible();
    expect(await page.locator('[data-test="nav-menu"]').innerText()).toContain('Mohammed A Zahid');
    expect(await page.locator('[data-test="page-title"]').innerText()).toContain('My account');
    expect(await page.locator('[data-test="nav-favorites"]').innerText()).toContain('Favorites');
  });

  test.afterEach(async ({ page }) => {
    // Ensure the user is logged out after each test
    await page.locator('[data-test="nav-menu"]').click();
    await page.waitForSelector('[data-test="nav-sign-out"]');
    await page.click('[data-test="nav-sign-out"]');
    await expect(page.locator('[data-test="nav-sign-in"]')).toBeVisible();
    expect(await page.locator('[data-test="nav-sign-in"]').innerText()).toContain('Sign in');
    await page.close();
  });
});
