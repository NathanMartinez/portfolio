import { expect, test } from '@playwright/test';

test('homepage renders through the Worker preview', async ({ page }) => {
	const response = await page.goto('/');
	expect(response?.status()).toBe(200);
	await expect(page).toHaveTitle(
		'Nate Martinez | Software Quality, Systems Engineering & Developer Tooling.'
	);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText(
		'Software Quality, Systems Engineering, and Developer Tooling.'
	);
});

test('homepage actions scroll, download the resume, and expose clear contact links', async ({
	page
}) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto('/');
	await page.getByRole('link', { name: 'View Projects' }).click();
	await expect(page).toHaveURL('/#projects');
	await expect(page.locator('#projects')).toBeInViewport();
	await page.getByRole('link', { name: 'Contact', exact: true }).click();
	await expect(page).toHaveURL('/#contact');
	await expect(page.locator('#contact')).toBeInViewport();
	for (const name of ['GitHub', 'LinkedIn']) {
		const link = page.locator('#contact').getByRole('link', { name: new RegExp(name) });
		await expect(link).toHaveAttribute('target', '_blank');
		await expect(link).toHaveAttribute('rel', /noopener/);
	}
	await expect(page.locator('#contact').getByRole('link', { name: 'Email' })).toHaveAttribute(
		'href',
		'mailto:natemtztech@gmail.com'
	);
	await expect(page.getByRole('button', { name: 'Next project' })).toBeVisible();
	await page
		.context()
		.route('https://github.com/NathanMartinez/bun-burner', (route) =>
			route.fulfill({ status: 200, body: 'Repository destination' })
		);
	const popupPromise = page.waitForEvent('popup');
	await page.getByRole('link', { name: /View on GitHub/ }).click();
	const popup = await popupPromise;
	await expect(popup).toHaveURL('https://github.com/NathanMartinez/bun-burner');
	await popup.close();
	const downloadPromise = page.waitForEvent('download');
	await page.getByRole('link', { name: 'Download Resume' }).click();
	const download = await downloadPromise;
	expect(download.suggestedFilename()).toBe('resume.pdf');
	expect(await download.failure()).toBeNull();
});

test('featured projects carousel supports navigation and keyboard activation', async ({ page }) => {
	await page.goto('/');

	const next = page.getByRole('button', { name: 'Next project' });
	const previous = page.getByRole('button', { name: 'Previous project' });

	await expect(page.getByRole('heading', { name: 'Bun Burner' })).toBeVisible();

	await next.click();
	await expect(page.getByRole('heading', { name: 'Chora' })).toBeVisible();

	await previous.click();
	await expect(page.getByRole('heading', { name: 'Bun Burner' })).toBeVisible();

	await next.focus();
	await page.keyboard.press('Enter');
	await expect(page.getByRole('heading', { name: 'Chora' })).toBeVisible();

	await previous.focus();
	await page.keyboard.press('Space');
	await expect(page.getByRole('heading', { name: 'Bun Burner' })).toBeVisible();
});
