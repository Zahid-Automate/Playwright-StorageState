export class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = this.page.locator('[data-test="email"]');
    this.password = this.page.locator('[data-test="password"]');
    this.submit = this.page.locator('[data-test="login-submit"]');
    this.navMenu = this.page.locator('[data-test="nav-menu"]');
    this.navSignOut = this.page.locator('[data-test="nav-sign-out"]');
    this.navSignIn = this.page.locator('[data-test="nav-sign-in"]');
  }

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/auth/login');
  }

  async login(email, password) {
    await this.goto();
    await this.username.fill(email);
    await this.password.fill(password);
    await this.submit.waitFor({ state: 'visible' });
    await this.submit.click();
  }

  async logout() {
    await this.navMenu.click();
    await this.navSignOut.waitFor({ state: 'visible' });
    await this.navSignOut.click();
    await this.navSignIn.waitFor({ state: 'visible' });
  }
}
