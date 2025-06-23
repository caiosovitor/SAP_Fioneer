import { defineConfig } from 'cypress';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';

export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // Configures the Cucumber plugin – Cucumber is the tool used to link feature files with the project’s implementation code
      await addCucumberPreprocessorPlugin(on, config);

      // Configures the preprocessor for TypeScript with esbuild
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },

    // Pattern for .feature files (BDD)
    specPattern: '**/*.feature',

    // Base URL, described here below!:
    baseUrl: 'https://www.sapfioneer.com/',
    // supportFile: 'cypress/support/e2e.ts',
  },
});
