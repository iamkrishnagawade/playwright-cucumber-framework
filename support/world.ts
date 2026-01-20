import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export class OurWorld extends World {
  page!: Page;
  context!: BrowserContext;

  // page object instances
  loginPage!: LoginPage;

  constructor(options: IWorldOptions) {
    super(options);
  }

  // Initialize page objects after the page is created
  async initPages() {
    this.loginPage = new LoginPage(this.page);
  }
}

setWorldConstructor(OurWorld);
