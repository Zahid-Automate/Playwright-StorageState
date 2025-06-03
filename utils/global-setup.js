require('dotenv').config();
const { chromium } = require('@playwright/test');

async function globalSetup() {
  console.log('🚀 Global setup starting...');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://practicesoftwaretesting.com/auth/login');

  await page.waitForSelector('[data-test="email"]');

  await page.locator('[data-test="email"]').fill(process.env.PLAYWRIGHT_USERNAME);
  await page.locator('[data-test="password"]').fill(process.env.PLAYWRIGHT_PASSWORD);
  await page.click('[data-test="login-submit"]');

  await page.waitForLoadState('networkidle');
  await context.storageState({ path: 'storageState.json' });

  console.log('✅ Storage state saved.');
  await browser.close();
}

// ✅ Automatically run the function if called directly
if (require.main === module) {
  globalSetup();
}

module.exports = globalSetup;
