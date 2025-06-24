import { defineConfig } from 'cypress';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';

export default defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true,
    timestamp: 'mmddyyyy_HHMMss' // adiciona horário ao nome do arquivo, evita sobrescrever
  },
  e2e: {
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },

    baseUrl: 'https://www.sapfioneer.com/',
    specPattern: '**/*.feature',
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    video: false
  }
});
