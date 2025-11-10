import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  outputDir: 'test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list', { printSteps: true }],
    ['html'],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false
    }]
  ],
  timeout: 90 * 1000,

  use: {
    actionTimeout: 15 * 1000,
    navigationTimeout: 30 * 1000,
    baseURL: process.env.BASE_URL,
    headless: true,
    screenshot: {
      mode: 'on',
      fullPage: true
    },
    video: {
      mode: 'retain-on-failure',
      size: { height: 1920, width: 1080 }
    },
    trace: 'retain-on-failure',
    acceptDownloads: true,
    viewport: { height: 1920, width: 1080 }
  },

  projects: [
    {
      name: 'authentication-setup',
      testMatch: '**/authentication.setup.ts'
    },

    {
      name: 'automation-playwright-mcp-server',
      use: { browserName: 'chromium', storageState: path.join(__dirname, '.auth/auth.json') },
      dependencies: ['authentication-setup'],
      testMatch: '**/01**'
    },

    {
      name: 'orangeHrm',
      use: { browserName: 'chromium' },
      testMatch: '**/orangeHrm.spec.ts'
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
