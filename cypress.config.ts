import { defineConfig } from 'cypress';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';

export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // Configura o plugin Cucumber
      await addCucumberPreprocessorPlugin(on, config);

      // Configura o preprocessor para TypeScript com esbuild
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },

    // Padrão para arquivos .feature (BDD)
    specPattern: '**/*.feature',

    // Se quiser, pode configurar baseUrl e suporte aqui:
    // baseUrl: 'https://www.sapfioneer.com',
    // supportFile: 'cypress/support/e2e.ts',
  },
});
