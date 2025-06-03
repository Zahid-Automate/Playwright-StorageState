require('dotenv').config();
const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: false }); // headless false to see what's happening
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://practicesoftwaretesting.com/auth/login');

  // Navigate to login
  //await page.click('text=My Account');

  // Wait for login fields
  await page.waitForSelector('[data-test="email"]', { timeout: 10000 });

  const playwrightEmail = process.env.PLAYWRIGHT_USERNAME;
  const playwrightPassword = process.env.PLAYWRIGHT_PASSWORD;

  if (!playwrightEmail || !playwrightPassword) {
    throw new Error("Missing PLAYWRIGHT_USERNAME or PLAYWRIGHT_PASSWORD in environment");
  }

  await page.locator('[data-test="email"]').fill(playwrightEmail);
  await page.locator('[data-test="password"]').fill(playwrightPassword);
  await page.click('[data-test="login-submit"]');

  await page.waitForLoadState('networkidle');
  await context.storageState({ path: 'storageState.json' });

  await browser.close();
})();
