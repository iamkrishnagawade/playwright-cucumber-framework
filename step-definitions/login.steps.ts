import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { OurWorld } from '../support/world';

Given('I navigate to the login page', async function (this: OurWorld) {
    if(!this.page) throw new Error("Page is not initialized");
    await this.page?.goto('https://www.saucedemo.com/');
});

When('I enter {string} and {string}', async function (this: OurWorld, username: string, password: string) {
  await this.page?.fill('#user-name', username);
  await this.page?.fill('#password', password);
});

When('I click the login button', async function (this: OurWorld) {
  await this.page?.click('#login-button');
  await this.page?.waitForLoadState('networkidle');
});

Then('I should see the {string} title', async function (this: OurWorld, expectedTitle: string) {
  const title = await this.page?.textContent('.title');
  expect(title).toBe(expectedTitle);
});