import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: 'tests/e2e/cypress/integration/**/*.cy.js',
    supportFile: 'tests/e2e/cypress/support/e2e.js',
    baseUrl: 'http://127.0.0.1:5173',
    video: false,
  },
});
