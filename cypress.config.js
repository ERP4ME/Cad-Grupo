const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 607,
  viewportWidth: 1400,
  projectId: 'ehz3wk',
  chromeWebSecurity: false,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  experimentalSessionSupport: true,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://erpforme-hml.alterdata.com.br/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
