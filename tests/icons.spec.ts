import { expect, test } from '@playwright/test';

test('site and project icons serve image assets at their declared paths', async ({
	request,
	page
}) => {
	for (const [path, type] of [
		['/favicon.ico', /image\/(?:x-icon|vnd.microsoft.icon)/],
		['/apple-touch-icon.png', /image\/png/],
		['/apple-touch-icon-precomposed.png', /image\/png/],
		['/icons/projects/bun-burner.svg', /image\/svg\+xml/],
		['/icons/projects/chora.svg', /image\/svg\+xml/]
	] as const) {
		const response = await request.get(path);
		expect(response.status(), path).toBe(200);
		expect(response.headers()['content-type'], path).toMatch(type);
		expect((await response.body()).length, path).toBeGreaterThan(0);
	}
	await page.goto('/');
	await expect(page.locator('link[rel="icon"][type="image/x-icon"]')).toHaveAttribute(
		'href',
		/\/favicon\.ico$/
	);
	await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute(
		'href',
		/\/apple-touch-icon\.png$/
	);
});
