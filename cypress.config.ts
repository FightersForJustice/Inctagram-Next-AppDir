import { defineConfig } from 'cypress';
const getCompareSnapshotsPlugin = require('cypress-image-diff-js/plugin');

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return getCompareSnapshotsPlugin(on, config);
    },
    baseUrl: 'http://localhost:3000'
    // supportFile: 'cypress/e2e/app.cy.js',
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
