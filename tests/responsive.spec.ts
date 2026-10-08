import { expect, test } from '@playwright/test';

for (const viewport of [
	{ width: 1440, height: 900 },
	{ width: 768, height: 1024 },
	{ width: 390, height: 844 }
]) {
	for (const colorScheme of ['light', 'dark'] as const) {
		test(`${viewport.width}px ${colorScheme}: assets, layout and project navigation`, async ({
			page
		}, testInfo) => {
			const errors: string[] = [];
			page.on('pageerror', (error) => errors.push(error.message));
			page.on('console', (message) => {
				if (message.type() === 'error') errors.push(message.text());
			});
			page.on('response', (response) => {
				if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
			});
			page.on('requestfailed', (request) => errors.push(`Failed: ${request.url()}`));
			await page.setViewportSize(viewport);
			await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
			await page.goto('/');
			await page.evaluate(() => document.fonts.ready);
			await expect(page.getByRole('heading', { name: 'Bun Burner', exact: true })).toBeVisible();
			await page.getByRole('button', { name: 'Next project' }).press('Enter');
			await expect(page.getByRole('heading', { name: 'Chora', exact: true })).toBeVisible();
			await expect(page.locator('.project-description')).toContainText('three merged upstream');
			await expect(page.getByRole('link', { name: /View on GitHub/ })).toHaveAttribute(
				'href',
				'https://github.com/CraftWorksMC/Chora'
			);
			await page.getByRole('button', { name: 'Previous project' }).press('Space');
			await expect(page.getByRole('heading', { name: 'Bun Burner', exact: true })).toBeVisible();
			await expect(page.locator('.project-description')).toContainText('source-preserving');
			expect(
				await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
			).toBe(true);
			expect(
				await page
					.locator('img')
					.evaluateAll((images) =>
						images.every((image) => (image as HTMLImageElement).naturalWidth > 0)
					)
			).toBe(true);
			await page.screenshot({ path: testInfo.outputPath('homepage.png'), fullPage: true });
			expect(errors).toEqual([]);
		});
	}
}
