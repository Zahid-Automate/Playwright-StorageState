export class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('[data-test="email"]');
    this.password = page.locator('[data-test="password"]');
    this.submit = page.locator('[data-test="login-submit"]');
    this.navMenu = page.locator('[data-test="nav-menu"]');
    this.navSignOut = page.locator('[data-test="nav-sign-out"]');
    this.navSignIn = page.locator('[data-test="nav-sign-in"]');
  }

  async goto() {
    await this.page.goto('/#/auth/login');
  }

  async login(email, password) {
    await this.goto();
    await this.username.fill(email);
    await this.password.fill(password);
    await this.submit.waitFor({ state: 'visible' });
    await this.submit.click();
  }
}
// This class encapsulates the login page functionality for Playwright tests.
// It includes methods to navigate to the login page and perform login actions.