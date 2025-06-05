# 🔐 Playwright Login Automation with Storage State

This project uses [Playwright](https://playwright.dev/) to automate login and persist the authenticated session state in a `.auth/storageState.json` file. This allows reusing the login state in future tests without logging in each time.

---

## 📁 Project Structure

```
.
├── .env                    # Contains login credentials (excluded from version control)
├── .gitignore
├── .auth/                 # Contains the generated storageState.json
├── auth/
├── node_modules/
├── pages/
│   └── loginPage.js       # Page Object Model for login page
├── playwright.config.js   # Playwright config file
├── tests/
│   └── accounts/
│       └── accountLogin.spec.js   # Your actual test using the login state
├── utils/
│   └── loginSetup.js      # Script to log in and generate storage state
├── package.json
└── README.md
```

---

## ⚙️ Prerequisites

Ensure the following are installed:

- Node.js (v16 or later recommended)
- npm
- Playwright and its dependencies

Install Playwright and dependencies:

```bash
npm install
npx playwright install
```

---

## 🔑 .env Configuration

Create a `.env` file at the root of the project to store your credentials securely:

```
PLAYWRIGHT_USERNAME=your@email.com
PLAYWRIGHT_PASSWORD=yourPassword
```

> ⚠️ Never commit your `.env` file to version control.

---

## 🚀 Run the Login Script

The `loginSetup.js` script launches the browser, logs in using the provided credentials, and saves the session state:

```bash
node utils/loginSetup.js
```

After successful login, it will generate:

```
.auth/storageState.json
```

You can now reuse this state in your tests to avoid logging in again.

---

## 🧪 Using the Stored State in Tests

In your Playwright config or test file:

```js
use: {
  storageState: '.auth/storageState.json',
}
```

Or in your test:

```js
const { test } = require('@playwright/test');

test.use({ storageState: '.auth/storageState.json' });

test('Verify account page loads', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/account');
  // your test assertions here
});
```

---

## 📄 Sample loginSetup.js

```js
require('dotenv').config();
const { chromium } = require('@playwright/test');

async function loginSetup() {
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

  await page.waitForURL('**/account', { timeout: 10000 });
  await page.locator('[data-test="nav-menu"]').toBeVisible();

  await context.storageState({ path: '.auth/storageState.json' });
  await browser.close();
}

loginSetup().catch((e) => {
  console.error("Login setup failed:", e);
  process.exit(1);
});
```

---

## ✅ Benefits

- Speeds up testing by avoiding repetitive login steps
- Cleaner tests
- Secure credential handling using environment variables

---

## 🧼 .gitignore Suggestions

Add the following to your `.gitignore`:

```
.env
.auth/
```

---

## 📬 Questions?

Feel free to open an issue or submit a pull request if you need improvements or bug fixes.

---
