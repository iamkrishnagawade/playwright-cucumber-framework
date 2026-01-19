import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly pageTitle: Locator;
    private readonly baseUrl: string;

    constructor(page: Page) {
        this.page = page;
        this.baseUrl = process.env.BASE_URL || 'https://www.saucedemo.com';
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.pageTitle = page.locator('.title');
    }

    async navigate() {
        await this.page.goto(this.baseUrl);
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getTitle(): Promise<string | null> {
        return await this.pageTitle.textContent();
    }
}