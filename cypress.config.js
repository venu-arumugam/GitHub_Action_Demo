require("dotenv").config();

const { defineConfig } = require("cypress");
const { merge } = require("mochawesome-merge");
const marge = require("mochawesome-report-generator");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://the-internet.herokuapp.com",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    env: {
      apiBaseUrl: "https://restful-booker.herokuapp.com",
      adminUsername: process.env.CYPRESS_ADMIN_USERNAME || "",
      adminPassword: process.env.CYPRESS_ADMIN_PASSWORD || ""
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports/json",
      overwrite: false,
      html: false,
      json: true
    },
    setupNodeEvents(on, config) {
      on("after:run", async () => {
        const jsonReport = await merge({
          files: ["cypress/reports/json/*.json"]
        });
        await marge.create(jsonReport, {
          reportDir: "cypress/reports/html",
          reportFilename: "index",
          inline: true
        });
        console.log("Mochawesome HTML report generated at cypress/reports/html/index.html");
      });
      return config;
    }
  }
});