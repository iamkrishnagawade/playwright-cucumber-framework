import { Before, After, BeforeAll, AfterAll, Status } from "@cucumber/cucumber";
import { chromium, Browser } from "@playwright/test";
import { OurWorld } from "./world";

let browser: Browser;

BeforeAll(async () => {
  browser = await chromium.launch({
    headless: process.env.HEADLESS !== 'false',
    slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 0,
  });
});

Before(async function (this: OurWorld) {
  try {
    this.context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: { dir: 'test-results/videos' },
    });
    this.page = await this.context.newPage();

    // Initialize page objects here if needed
    await this.initPages();
  } catch (error) {
    console.error('Failed to initialize browser context:', error);
    throw error;
  }
});

After(async function (this: OurWorld, { result }) {
    try {
        if (result?.status === Status.FAILED) {
            const img = await this.page?.screenshot();
            img && this.attach(img, 'image/png');
        }
    } catch (error) {
        console.error('Failed to capture screenshot:', error);
    }

    try {
        await this.page?.close();
        await this.context?.close();
    } catch (error) {
        console.error('Failed to close browser context:', error);
    }
});

AfterAll(async () => {
  try {
    await browser.close();
  } catch (error) {
    console.error('Failed to close browser:', error);
  }
});