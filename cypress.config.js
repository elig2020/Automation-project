const { defineConfig } = require("cypress");


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Set up the 'fail' event listener
      on('before:run', (error) => {
        // Log an error message when a test fails
        console.error('Test failed:', error)
      })
    },
    fixturesFolder: "cypress/fixtures",
    baseUrl: 'http://localhost:3030',
    commandsFile: "cypress/support/commands.js" 
  },
});

