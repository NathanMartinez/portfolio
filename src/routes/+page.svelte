<script lang="ts">
	import { asset } from '$app/paths';
	import Atmosphere from '$lib/components/Atmosphere.svelte';
	import FeaturedProjects from '$lib/components/FeaturedProjects.svelte';
	import { projects } from '$lib/data/projects';

	const skills = [
		'TypeScript',
		'Linux',
		'Test Automation',
		'API & Integration Testing',
		'Git & GitHub Actions',
		'Systems Engineering',
		'Infrastructure Automation',
		'Podman & Containers',
		'Networking & DNS',
		'CI/CD',
		'Defect Reproduction',
		'Technical Troubleshooting'
	];
</script>

<svelte:head>
	<title>Nate Martinez | Software Quality, Systems Engineering & Developer Tooling.</title>

	<meta
		name="description"
		content="Portfolio for Nate Martinez: software quality, systems support, automation, and open-source developer tooling."
	/>

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Nate Martinez" />
	<meta
		property="og:title"
		content="Nate Martinez | Software Quality, Systems Engineering & Developer Tooling."
	/>
	<meta
		property="og:description"
		content="Software quality, systems support, automation, and open-source developer tooling."
	/>
	<meta property="og:url" content="https://natemtz.dev/" />
	<meta property="og:image" content="https://natemtz.dev/assets/og-preview.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="twitter:title"
		content="Nate Martinez | Software Quality, Systems Engineering & Developer Tooling."
	/>
	<meta
		name="twitter:description"
		content="Software quality, systems support, automation, and open-source developer tooling."
	/>
	<meta name="twitter:image" content="https://natemtz.dev/assets/og-preview.png" />
</svelte:head>

<Atmosphere />
<main class="page-shell">
	<section class="glass hero" aria-labelledby="hero-heading">
		<p class="eyebrow">Nate Martinez</p>
		<h1 id="hero-heading">
			Software Quality,<br /> Systems Engineering,<br /> and Developer Tooling.
		</h1>
		<p class="hero-description">
			I bring enterprise QA and systems experience to software testing, infrastructure automation,
			and developer tooling. I build reliable tools, investigate complex failures, and contribute
			fixes to open-source software.
		</p>
		<div class="hero-actions">
			<a href="#projects" class="btn">View Projects <span aria-hidden="true">↘</span></a>
			<a href={asset('/resume.pdf')} download class="btn btn-secondary">Download Resume</a>
			<a href="#contact" class="btn btn-quiet">Contact <span aria-hidden="true">↘</span></a>
		</div>
	</section>

	<section class="glass skills-strip" aria-labelledby="skills-heading">
		<h2 id="skills-heading" class="eyebrow">Technical Expertise</h2>
		<ul class="tech-list" aria-label="Skills and tools">
			{#each skills as skill (skill)}<li>{skill}</li>{/each}
		</ul>
	</section>

	<FeaturedProjects {projects} />

	<section id="contact" class="glass contact-section" aria-labelledby="contact-heading">
		<div>
			<p class="eyebrow">Let's connect</p>
			<h2 id="contact-heading">Have an idea<br />or a challenge?</h2>
			<p class="contact-description">
				Open to opportunities in software quality, systems support, automation, and developer
				tooling.
			</p>
		</div>
		<div class="contact-links">
			<a href="https://github.com/NathanMartinez" target="_blank" rel="noopener noreferrer">
				<span class="contact-label"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						class="contact-icon"
						viewBox="0 0 16 16"
						aria-hidden="true"
					>
						<path
							d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
						/>
					</svg><span>GitHub</span></span
				><span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span>
			</a>
			<a
				href="https://www.linkedin.com/in/nathan-m-145133288"
				target="_blank"
				rel="noopener noreferrer"
			>
				<span class="contact-label"
					><svg
						aria-hidden="true"
						class="contact-icon"
						fill="currentColor"
						viewBox="0 0 16 16"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
						/>
					</svg><span>LinkedIn</span></span
				><span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span>
			</a>
			<a href="mailto:natemtztech@gmail.com"
				><span class="contact-label"
					><svg
						aria-hidden="true"
						class="contact-icon"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 16 16"
					>
						<path
							d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"
						/>
					</svg><span>Email</span></span
				><span aria-hidden="true">↗</span></a
			>
		</div>
	</section>
	<footer class="site-footer">
		<span>Nate Martinez</span>
		<a href="https://github.com/NathanMartinez/portfolio" target="_blank" rel="noopener noreferrer"
			>View this site on GitHub <span aria-hidden="true">↗</span><span class="sr-only">
				(opens in a new tab)</span
			></a
		>
	</footer>
</main>
