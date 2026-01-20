import { expect, Page } from '@playwright/test';

export default class Assert {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectElementVisible(selector: string) {
    const element = await this.page.waitForSelector(selector, { state: 'visible' });
    expect(element).not.toBeNull();
  }
}
