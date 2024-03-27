import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';
// @ts-expect-error moduleResolution
import { registerArgosTask } from '@argos-ci/cypress/task';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      bundler: 'vite',
      webServerCommands: {
        default: 'nx run org:serve',
        production: 'nx run org:preview',
      },
      ciWebServerCommand: 'nx run org:serve-static',
    }),
    async setupNodeEvents(on, config) {
      registerArgosTask(on, config, {
        // Enable upload to Argos only when it runs on CI.
        uploadToArgos: !!process.env.CI,
        // Set your Argos token (required only if you don't use GitHub Actions).
        token: '917a2a86b2a1edb947023ef05070839f122aff2e',
      });

      // include any other plugin code...
    },
  },
});
