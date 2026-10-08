import { expect, test } from '@playwright/test';

test('missing pages return 404, count visits once, and offer a way home', async ({ page }) => {
	const response = await page.goto('/missing-page');
	expect(response?.status()).toBe(404);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('404');
	await expect(page.locator('[aria-live="polite"]')).not.toBeEmpty();
	expect(await page.evaluate(() => localStorage.getItem('portfolio:404-visits'))).toBe('1');
	await page.reload();
	await expect
		.poll(() => page.evaluate(() => localStorage.getItem('portfolio:404-visits')))
		.toBe('2');
	await page.getByRole('link', { name: 'Back home' }).click();
	await expect(page).toHaveURL('/');
	await expect(page.getByRole('heading', { level: 1 })).toContainText('Software Quality');
});

test('missing pages remain usable when browser storage is blocked', async ({ page }) => {
	await page.addInitScript(() => {
		Object.defineProperty(window, 'localStorage', {
			get() {
				throw new DOMException('Storage blocked', 'SecurityError');
			}
		});
	});
	await page.goto('/missing-page');
	await expect(page.locator('[aria-live="polite"]')).not.toBeEmpty();
	await page.getByRole('link', { name: 'Back home' }).click();
	await expect(page).toHaveURL('/');
});
