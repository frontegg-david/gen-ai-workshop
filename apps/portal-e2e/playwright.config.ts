import { defineConfig, devices } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';

import { workspaceRoot } from '@nx/devkit';

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] || 'http://localhost:3000';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  projects: [ {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  } ],
  fullyParallel:false,
  use: {
    headless: false,
    baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: process.env.AI_REPORT ? 'on' : 'on-first-retry',

  },
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'yarn nx serve portal',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    cwd: workspaceRoot,
  },
});
