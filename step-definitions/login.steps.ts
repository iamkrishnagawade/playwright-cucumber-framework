import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { OurWorld } from '../support/world';

Given('I navigate to the login page', async function (this: OurWorld) {
  await this.loginPage.navigate();
});

When(
  'I enter {string} and {string}',
  async function (this: OurWorld, username: string, password: string) {
    await this.loginPage.login(username, password);
  }
);

Then('I should see the {string} title', async function (this: OurWorld, expectedTitle: string) {
  const title = await this.loginPage.getTitle();
  expect(title).toBe(expectedTitle);
});
