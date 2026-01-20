import { Page, Locator } from '@playwright/test';
import { logger } from '../support/logger';
import { TimeoutConfig, AppConfig } from '../support/config';

export class LoginPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly pageTitle: Locator;
  private readonly baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = AppConfig.baseUrl;
    // Configure locators with custom timeouts for potentially flaky selectors
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.pageTitle = page.locator('.title');
  }

  async navigate() {
    logger.info(`Navigating to: ${this.baseUrl}`);
    await this.page.goto(this.baseUrl, {
      timeout: TimeoutConfig.navigation.default,
      waitUntil: 'domcontentloaded',
    });

    // Wait for login form to be ready with custom timeout
    await this.usernameInput.waitFor({
      state: 'visible',
      timeout: TimeoutConfig.element.default,
    });
    logger.info('Login page loaded successfully');
  }

  async login(username: string, password: string) {
    logger.info(`Attempting login for user: ${username}`);

    // Use custom timeouts for each interaction to handle flaky selectors
    await this.usernameInput.fill(username, {
      timeout: TimeoutConfig.element.default,
    });
    await this.passwordInput.fill(password, {
      timeout: TimeoutConfig.element.default,
    });
    await this.loginButton.click({
      timeout: TimeoutConfig.element.default,
    });

    logger.info('Login button clicked');

    // Wait for navigation to complete after login
    await this.page.waitForLoadState('networkidle', {
      timeout: TimeoutConfig.wait.networkIdle,
    });
    logger.info('Login navigation completed');
  }

  async getTitle(): Promise<string | null> {
    // Wait for title element to be visible with custom timeout
    await this.pageTitle.waitFor({
      state: 'visible',
      timeout: TimeoutConfig.assertion.visibility,
    });
    return await this.pageTitle.textContent({
      timeout: TimeoutConfig.element.fast,
    });
  }
}
