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
			page.on('requestfailed', (request) =>
				errors.push(`Failed: ${request.url()} (${request.failure()?.errorText})`)
			);
			await page.setViewportSize(viewport);
			await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
			await page.goto('/');
			await page.evaluate(() => document.fonts.ready);
			await expect(page.getByRole('heading', { name: 'Bun Burner', exact: true })).toBeVisible();
			await expect(page.locator('.project-logo use')).toHaveAttribute(
				'href',
				'/icons/projects/bun-burner.svg#logo'
			);
			const bunHeader = await page.locator('.project-identity').boundingBox();
			if (viewport.width < 760) {
				await expect(page.locator('.project-logo-frame')).toHaveCSS('width', '56px');
				await expect(page.locator('.project-logo-frame')).toHaveCSS('height', '56px');
				await expect(page.locator('.project-identity-label')).toHaveCSS('font-size', '12px');
				await expect(page.locator('.project-label')).toHaveCSS('font-size', '11px');
			}
			await page.getByRole('button', { name: 'Next project' }).press('Enter');
			await expect(page.getByRole('heading', { name: 'Chora', exact: true })).toBeVisible();
			await expect(page.locator('.project-logo use')).toHaveAttribute(
				'href',
				'/icons/projects/chora.svg#logo'
			);
			await expect(page.locator('.chora-icon')).toHaveCSS(
				'color',
				colorScheme === 'light' ? 'rgb(69, 78, 148)' : 'rgb(178, 187, 255)'
			);
			if (viewport.width < 760) {
				const choraHeader = await page.locator('.project-identity').boundingBox();
				expect(choraHeader?.height).toBe(bunHeader?.height);
				await expect(page.locator('.project-logo-frame')).toHaveCSS('width', '56px');
				await expect(page.locator('.project-identity-label')).toHaveCSS('font-size', '12px');
				expect(
					await page
						.locator('.project-identity')
						.evaluate((element) => element.scrollWidth <= element.clientWidth)
				).toBe(true);
			}
			await page.locator('.project-card').screenshot({ path: testInfo.outputPath('chora.png') });
			await page
				.locator('.project-identity')
				.screenshot({ path: testInfo.outputPath('chora-header.png') });
			await expect(page.locator('.project-description')).toContainText('three merged upstream');
			await expect(page.getByRole('link', { name: /View on GitHub/ })).toHaveAttribute(
				'href',
				'https://github.com/CraftWorksMC/Chora'
			);
			await page.getByRole('button', { name: 'Previous project' }).press('Space');
			await expect(page.getByRole('heading', { name: 'Bun Burner', exact: true })).toBeVisible();
			await expect(page.locator('.project-description')).toContainText('source-preserving');
			await expect(page.locator('.project-logo')).toHaveCSS(
				'stroke-width',
				colorScheme === 'light' ? '3.5px' : '2px'
			);
			await expect(page.locator('.project-identity-label')).toHaveCSS(
				'color',
				colorScheme === 'light' ? 'rgb(37, 43, 45)' : 'rgb(229, 196, 156)'
			);
			await page
				.locator('.project-card')
				.screenshot({ path: testInfo.outputPath('bun-burner.png') });
			await page
				.locator('.project-identity')
				.screenshot({ path: testInfo.outputPath('bun-burner-header.png') });
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
