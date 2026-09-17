import { expect, test } from '@playwright/test';

test('homepage renders through the Worker preview', async ({ page }) => {
	const response = await page.goto('/');
	expect(response?.status()).toBe(200);
	await expect(page).toHaveTitle('Nate Martinez | Software QA, Systems & Infrastructure');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText(
		'Connecting software quality, systems troubleshooting, and reliable infrastructure.'
	);
});
