module.exports = [
  {
    files: ["cypress/**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        cy: "readonly",
        Cypress: "readonly",
        describe: "readonly",
        it: "readonly",
        before: "readonly",
        beforeEach: "readonly",
        after: "readonly",
        afterEach: "readonly",
        expect: "readonly",
        assert: "readonly",
        context: "readonly",
        DataTransfer: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off"
    }
  },
  {
    ignores: [
      "node_modules/**",
      "cypress/videos/**",
      "cypress/screenshots/**",
      "cypress/downloads/**"
    ]
  }
];