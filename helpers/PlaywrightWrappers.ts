import { Page } from '@playwright/test';
import { TimeoutConfig } from '../support/config';

export class PlaywrightWrappers {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url, {
      timeout: TimeoutConfig.navigation.default,
      waitUntil: 'domcontentloaded',
    });
  }

  async click(selector: string) {
    await this.page.click(selector, {
      timeout: TimeoutConfig.element.default,
    });
  }

  async waitForSelector(selector: string) {
    await this.page.waitForSelector(selector, {
      state: 'visible',
      timeout: TimeoutConfig.element.default,
    });
  }

  async type(selector: string, text: string) {
    await this.page.fill(selector, text, {
      timeout: TimeoutConfig.element.default,
    });
  }

  async getTextContent(selector: string): Promise<string | null> {
    const element = await this.page.waitForSelector(selector, {
      state: 'visible',
      timeout: TimeoutConfig.assertion.visibility,
    });
    return await element?.textContent();
  }
}
