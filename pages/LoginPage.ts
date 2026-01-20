import { Page } from '@playwright/test';
import { logger } from '../support/logger';
import { TimeoutConfig, AppConfig } from '../support/config';
import { PlaywrightWrappers } from '../helpers/PlaywrightWrappers';

export class LoginPage {
  private readonly page: Page;
  private readonly baseUrl: string;
  private readonly base: PlaywrightWrappers;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = AppConfig.baseUrl;
    this.base = new PlaywrightWrappers(page);
  }

  private Elements = {
    usernameInput: '#user-name',
    passwordInput: '#password',
    loginButton: '#login-button',
    pageTitle: '.title',
  };

  async navigate() {
    logger.info(`Navigating to: ${this.baseUrl}`);
    await this.base.goto(this.baseUrl);
    await this.base.waitForSelector(this.Elements.usernameInput);

    logger.info('Login page loaded successfully');
  }

  async login(username: string, password: string) {
    logger.info(`Attempting login for user: ${username}`);

    // Use custom timeouts for each interaction to handle flaky selectors
    await this.base.type(this.Elements.usernameInput, username);
    await this.base.type(this.Elements.passwordInput, password);
    await this.base.click(this.Elements.loginButton);
    logger.info('Login button clicked');

    // Wait for navigation to complete after login
    await this.page.waitForLoadState('networkidle', {
      timeout: TimeoutConfig.wait.networkIdle,
    });
    logger.info('Login navigation completed');
  }

  async getTitle(): Promise<string | null> {
    // Wait for title element to be visible with custom timeout
    await this.base.waitForSelector(this.Elements.pageTitle);
    return await this.base.getTextContent(this.Elements.pageTitle);
  }
}
