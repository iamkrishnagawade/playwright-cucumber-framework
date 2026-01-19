import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for Cucumber BDD tests
 * 
 * Note: Since we're using Cucumber to run tests, some settings here serve as defaults
 * or are used by Playwright's browser automation features.
 */
export default defineConfig({
  // Test directory - not used by Cucumber, but good to define
  testDir: './features',

  // Maximum time one test can run
  timeout: 60 * 1000, // 60 seconds

  // Global setup timeout
  globalTimeout: 10 * 60 * 1000, // 10 minutes

  // Expect timeout for assertions
  expect: {
    timeout: 10 * 1000, // 10 seconds
  },

  // Configure retries
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Reporter configuration (Cucumber handles its own reporting)
  reporter: 'html',

  // Shared settings for all projects
  use: {
    // Base URL for navigation
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',

    // Collect trace when retrying the failed test
    trace: process.env.CI ? 'on-first-retry' : 'retain-on-failure',

    // Screenshot settings
    screenshot: 'only-on-failure',

    // Video settings
    video: 'retain-on-failure',

    // Action timeout
    actionTimeout: 15 * 1000, // 15 seconds

    // Navigation timeout
    navigationTimeout: 30 * 1000, // 30 seconds

    // Browser viewport
    viewport: { width: 1280, height: 720 },

    // Ignore HTTPS errors
    ignoreHTTPSErrors: true,

    // Locale and timezone
    locale: 'en-US',
    timezoneId: 'America/New_York',
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Browser launch options
        launchOptions: {
          headless: process.env.HEADLESS !== 'false',
          slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 0,
        },
      },
    },

    // Uncomment to run tests on other browsers
    // {
    //   name: 'firefox',
    //   use: { 
    //     ...devices['Desktop Firefox'],
    //     launchOptions: {
    //       headless: process.env.HEADLESS !== 'false',
    //     },
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: { 
    //     ...devices['Desktop Safari'],
    //     launchOptions: {
    //       headless: process.env.HEADLESS !== 'false',
    //     },
    //   },
    // },

    // Mobile viewports
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  // Run local dev server before starting tests (if needed)
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  //   timeout: 120 * 1000,
  //   reuseExistingServer: !process.env.CI,
  // },
});
