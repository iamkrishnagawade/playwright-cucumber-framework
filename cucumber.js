module.exports = {
  default: {
    formatOptions: { snippetInterface: 'async-await' },
    paths: ['features/**/*.feature'],
    dryRun: false,
    require: ['step-definitions/**/*.ts', 'support/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress-bar', 'summary', 'html:cucumber-report.html'],
    publishQuiet: true,
  },
};