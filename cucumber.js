require('dotenv').config(); // Loads variables from .env

module.exports = {
  default: {
    formatOptions: { snippetInterface: 'async-await' },
    paths: ['features/**/*.feature'],
    dryRun: false,
    require: ['step-definitions/**/*.ts', 'support/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress-bar', 'summary', 'html:./test-results/cucumber-report.html'],
    publishQuiet: true,
    // Note: Parallel execution shares the browser instance from BeforeAll/AfterAll
    // Each worker gets its own context/page. Set to 1 if you encounter issues.
    parallel: 2,
    retry: 1,
    tag: process.env.TAGS || 'not @skip',
  },
};