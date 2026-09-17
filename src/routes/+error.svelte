<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Atmosphere from '$lib/components/Atmosphere.svelte';

	const repeatMessages = [
		'Are you getting lost?',
		"We've got to stop meeting like this.",
		"Okay, now I'm starting to think you're doing this on purpose.",
		"You know there's a home button, right? 😅"
	];
	let message = $state('');

	// Runs only in the browser, including when SvelteKit reuses this error page.
	afterNavigate(({ from, to }) => {
		if (page.status !== 404) return;
		if (from?.url.pathname === to?.url.pathname && from?.url.search === to?.url.search) return;

		let visits = 1;
		try {
			const stored = Number(localStorage.getItem('portfolio:404-visits'));
			visits = Number.isSafeInteger(stored) && stored >= 0 ? Math.min(stored + 1, 25) : 1;
			localStorage.setItem('portfolio:404-visits', String(visits));
		} catch {
			// Private browsing or blocked storage must not break the error page.
		}

		const pool = visits >= 5 ? repeatMessages : ['Works on my machine. 🤷🏽‍♂️'];
		message =
			visits >= 25
				? "I'm not even mad anymore. Welcome back."
				: pool[Math.floor(Math.random() * pool.length)];
	});
</script>

<svelte:head>
	<title>{page.status} | Nate Martinez</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<Atmosphere scene="error" />
<main class="page-shell error-shell">
	<section class="glass error-panel" aria-labelledby="error-heading">
		<p class="eyebrow">{page.status === 404 ? 'ROUTE_NOT_FOUND' : 'REQUEST_FAILED'}</p>
		<h1 id="error-heading" class="error-code">{page.status}</h1>
		{#if page.status === 404}
			<p class="error-message" aria-live="polite">{message}</p>
			<noscript><p class="error-message">Works on my machine. 🤷🏽‍♂️</p></noscript>
			<p class="error-description">
				The page you’re looking for may have moved, changed, or never existed.
			</p>
		{:else}
			<p class="error-message">{page.error?.message ?? 'Something went wrong.'}</p>
		{/if}
		<a href={resolve('/')} class="btn">Back home <span aria-hidden="true">↗</span></a>
	</section>
</main>
