import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import { OurWorld } from './world';
import { logger } from './logger';
import { AppConfig, TimeoutConfig } from './config';

let browser: Browser;

BeforeAll(async () => {
  browser = await chromium.launch({
    headless: AppConfig.headless,
    slowMo: AppConfig.slowMo,
  });
});

Before(async function (this: OurWorld, { pickle }) {
  logger.info(`--- Starting Scenario: ${pickle.name} ---`);
  try {
    this.context = await browser.newContext({
      viewport: AppConfig.viewport,
      recordVideo: { dir: 'test-results/videos' },
    });

    // Set default timeouts for the context
    this.context.setDefaultTimeout(TimeoutConfig.element.default);
    this.context.setDefaultNavigationTimeout(TimeoutConfig.navigation.default);

    this.page = await this.context.newPage();

    // Initialize page objects here if needed
    await this.initPages();
  } catch (error) {
    logger.error('Failed to initialize browser context:', error);
    throw error;
  }
});

After(async function (this: OurWorld, { result, pickle }) {
  try {
    if (result?.status === Status.FAILED) {
      logger.error(`--- Scenario Failed: ${pickle.name} ---`);
      const img = await this.page?.screenshot();
      if (img) {
        this.attach(img, 'image/png');
      }
    } else {
      logger.info(`--- Scenario Passed: ${pickle.name} ---`);
    }
  } catch (error) {
    logger.error('Failed to capture screenshot:', error);
  }

  try {
    await this.page?.close();
    await this.context?.close();
  } catch (error) {
    logger.error('Failed to close browser context:', error);
  }

  logger.info(`--- Finished Scenario ---`);
});

AfterAll(async () => {
  try {
    await browser.close();
  } catch (error) {
    logger.error('Failed to close browser:', error);
  }
});
