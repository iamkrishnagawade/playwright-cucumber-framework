/**
 * Centralized timeout configuration for the framework
 * Helps handle flaky selectors and slow network conditions
 */
export const TimeoutConfig = {
  // Element interaction timeouts
  element: {
    default: 15000, // Default timeout for element interactions
    slow: 30000, // For slow-loading elements (dropdowns, modals)
    fast: 5000, // For elements that should appear quickly
  },

  // Navigation timeouts
  navigation: {
    default: 30000, // Page navigation
    slow: 60000, // Slow pages (with heavy assets)
  },

  // Wait timeouts
  wait: {
    networkIdle: 10000, // Wait for network to be idle
    domContentLoaded: 15000, // Wait for DOM to load
    load: 30000, // Wait for full page load
  },

  // Assertion timeouts
  assertion: {
    default: 10000, // Default assertion timeout
    visibility: 5000, // Element visibility checks
  },
};

/**
 * Application configuration
 */
export const AppConfig = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
  headless: process.env.HEADLESS !== 'false',
  slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 0,
  viewport: { width: 1280, height: 720 },
};
