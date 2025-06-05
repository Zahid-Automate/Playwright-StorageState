import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';

test.use({ storageState: './auth/storageState.json' });

test.describe('My Account Login Test', () => {
  const loginPage = new LoginPage();
  test('Validate my account page', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/account'); // correct logged-in page
    await expect(page.locator('[data-test="nav-menu"]')).toBeVisible();
    expect(await page.locator('[data-test="nav-menu"]').innerText()).toContain('Mohammed A Zahid');
    expect(await page.locator('[data-test="page-title"]').innerText()).toContain('My account');
    expect(await page.locator('[data-test="nav-favorites"]').innerText()).toContain('Favorites');
  });

  test.afterEach(async ({ page }) => {
    // Ensure the user is logged out after each test
    loginPage.logout();
    await page.waitForTimeout(1000); // Wait for logout to complete
    await page.close();
  });
});
