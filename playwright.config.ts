import { defineConfig, devices } from '@playwright/test';

// Los tests corren contra dist/ servido con las cabeceras reales de customHttp.yml (CSP incluida).
// PW_CHROMIUM_PATH permite usar un Chromium ya instalado (entornos sin `playwright install`).
const executablePath = process.env.PW_CHROMIUM_PATH || undefined;

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'retain-on-failure',
    launchOptions: executablePath ? { executablePath } : {},
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'node scripts/serve-static.mjs dist 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
});
