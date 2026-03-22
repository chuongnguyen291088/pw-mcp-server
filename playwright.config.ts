import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { properties } from './properties.config';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  outputDir: 'test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list', { printSteps: false }],
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
    baseURL: properties.base_url,
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
      name: 'Orange HRM Setup',
      testMatch: '**/authentication.setup.ts'
    },

    {
      name: 'Orange HRM Execution',
      use: { browserName: 'chromium', storageState: path.join(__dirname, '.auth/auth.json') },
      dependencies: ['Orange HRM Setup'],
      testMatch: '**/01_**.spec.ts'
    },

    {
      name: 'orangeHrm',
      use: { browserName: 'chromium' },
      testMatch: '**/orangeHrm.spec.ts'
    },

    {
      name: 'Talk Fist Setup',
      testMatch: '**/talk_first_authentication.setup.ts'
    },

    {
      name: 'Talk First Execution',
      use: {
        browserName: 'chromium',
        storageState: path.join(__dirname, '.auth/talkFirstAuth.json')
      },
      dependencies: ['Talk Fist Setup'],
      testMatch: '**/talk_first_register_class.ts'
    }

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
