import { LoginPage } from "../../pages/loginPage";
import { test, expect } from "@playwright/test";

test("Login with Storage State json file", async ({ page }) => {

  const loginPage = new LoginPage(page);
  await loginPage.goto('/category/hand-tools');


  expect(await loginPage.navMenu.innerText()).toContain("Mohammed A Zahid");
})