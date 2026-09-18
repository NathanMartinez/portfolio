import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	use: { baseURL: 'http://127.0.0.1:8787', browserName: 'chromium' },
	webServer: {
		command: 'npm run preview',
		url: 'http://127.0.0.1:8787',
		reuseExistingServer: false,
		timeout: 120_000
	}
});
