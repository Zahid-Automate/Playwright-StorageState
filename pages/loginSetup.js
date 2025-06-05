require('dotenv').config();
const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://practicesoftwaretesting.com/auth/login');

  const email = process.env.PLAYWRIGHT_USERNAME;
  const password = process.env.PLAYWRIGHT_PASSWORD;

  if (!email || !password) {
    throw new Error('Missing PLAYWRIGHT_USERNAME or PLAYWRIGHT_PASSWORD in .env');
  }

  await page.locator('[data-test="email"]').fill(email);
  await page.locator('[data-test="password"]').fill(password);
  await page.click('[data-test="login-submit"]');

  //  Wait until you’re logged in
  await page.waitForURL('**/account', { timeout: 10000 });
  //await page.waitForSelector('[data-test="nav-user-menu"]', { timeout: 10000 });

  //  Save the authenticated state
  await context.storageState({ path: './storageState.json' });

  await browser.close();
})();
