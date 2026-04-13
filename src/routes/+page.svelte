<script lang="ts">
	const skills = [
		'Linux',
		'Docker',
		'Proxmox',
		'Cloudflare',
		'SvelteKit',
		'TypeScript',
		'Git',
		'Networking'
	];

	const projects = [
		{
			title: 'Home Lab',
			description:
				'Self-hosted lab for Linux, Docker, reverse proxy, DNS, monitoring, and service deployment.',
			stack: ['Proxmox', 'Ubuntu', 'Docker', 'Nginx Proxy Manager', 'AdGuard Home'],
			href: 'https://github.com/NathanMartinez/natemtz-homelab'
		},
		{
			title: 'Portfolio Site',
			description:
				'Personal developer portfolio built with SvelteKit and TypeScript, deployed on Cloudflare Pages.',
			stack: ['SvelteKit', 'TypeScript', 'Cloudflare Pages'],
			href: 'https://github.com/NathanMartinez/portfolio'
		},
		{
			title: 'Media Stack',
			description:
				'Containerized media and automation services with a focus on clean networking and maintainability.',
			stack: ['Docker Compose', 'Jellyfin', 'Sonarr', 'Radarr', 'Gluetun'],
			href: ''
		}
	];
</script>

<svelte:head>
	<title>Nate Martinez | Portfolio</title>
	<meta
		name="description"
		content="Portfolio for Nate Martinez focused on homelab, Linux, Docker, web development, and infrastructure projects."
	/>
	<meta property="og:title" content="Nate Martinez | Portfolio" />
	<meta
		property="og:description"
		content="Homelab, Linux, Docker, web development, and infrastructure projects."
	/>
	<meta property="og:type" content="website" />
</svelte:head>

<main class="min-h-screen max-w-6xl p-5">
	<div
		class="bg-accent/10 pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl"
	></div>
	<section class="relative overflow-hidden sm:py-4 lg:py-8">
		<p class="eyebrow text-xl sm:text-2xl">Nate Martinez</p>

		<h1 class="font-mono text-4xl leading-[1.02] tracking-[-0.04em] sm:text-3xl lg:text-5xl">
			Building practical systems with Linux, Docker, and modern web tools.
		</h1>

		<p class="text-muted mt-5 max-w-2xl text-base leading-8 sm:text-lg">
			I build homelab infrastructure, self-hosted services, and web projects with a focus on
			reliability, clarity, and hands-on problem solving.
		</p>

		<div class="mt-6 flex flex-wrap gap-3">
			<a href="#projects" class="btn">View Projects</a>
			<a href="#contact" class="btn btn-secondary">Contact</a>
		</div>

		<p
			class="border-border bg-panel text-subtle mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-sm"
		>
			<span class="h-2 w-2 rounded-full bg-emerald-400"></span>
			Building homelab infra, containerized services, and web projects.
		</p>
	</section>

	<section class="mb-14 sm:mb-16">
		<h2 class="mb-4 font-mono text-2xl sm:text-3xl">About</h2>
		<p class="text-muted text-base leading-8 sm:text-lg">
			I’m an engineer and repair technician expanding into systems administration, DevOps,
			infrastructure, and software development. I enjoy building useful systems, documenting what I
			learn, and turning messy setups into clean, repeatable workflows.
		</p>
	</section>

	<section class="mb-14 sm:mb-16">
		<h2 class="mb-4 font-mono text-2xl sm:text-3xl">Skills</h2>
		<div class="flex flex-wrap gap-2.5 sm:gap-3">
			{#each skills as skill}
				<span
					class="border-border bg-panel text-muted hover:border-accent hover:text-accent rounded-full border px-3 py-2 text-sm transition"
				>
					{skill}
				</span>
			{/each}
		</div>
	</section>

	<section id="projects" class="mb-14 sm:mb-16">
		<h2 class="mb-4 font-mono text-2xl sm:text-3xl">Projects</h2>
		<div class="smgrid-cols-1 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each projects as project}
				<a
					href={project.href}
					target="_blank"
					rel="noreferrer"
					class="card block p-5 sm:p-6"
					aria-label={`Open project: ${project.title}`}
				>
					<h3 class="mb-3 font-mono text-lg font-semibold sm:text-xl">{project.title}</h3>
					<p class="text-subtle mb-4 grow text-sm leading-7 sm:text-base">
						{project.description}
					</p>

					<div class="flex flex-wrap gap-2">
						{#each project.stack as item}
							<span
								class="border-border bg-elevated text-muted rounded-full border px-2.5 py-1 text-xs"
							>
								{item}
							</span>
						{/each}
					</div>
				</a>
			{/each}
		</div>
	</section>
	<footer id="contact" class="border-border mt-10 border-t pt-8 sm:pt-10">
		<p class="text-subtle mb-4 text-center font-mono text-sm">Get in touch</p>

		<div class="flex items-center justify-center gap-3 sm:gap-4">
			<a
				href="https://github.com/NathanMartinez"
				aria-label="GitHub profile"
				class="icon-link"
				target="_blank"
				rel="noreferrer"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					class="icon"
					viewBox="0 0 16 16"
					aria-hidden="true"
				>
					<path
						d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
					/>
				</svg>
			</a>

			<a
				href="https://www.linkedin.com/in/nathan-m-145133288"
				aria-label="LinkedIn profile"
				class="icon-link"
				target="_blank"
				rel="noreferrer"
			>
				<svg
					aria-hidden="true"
					class="icon"
					role="img"
					fill="currentColor"
					viewBox="0 0 16 16"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
					/>
				</svg>
			</a>

			<a href="mailto:natemtztech@gmail.com" aria-label="Email Nate" class="icon-link">
				<svg
					aria-hidden="true"
					class="icon"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 16 16"
				>
					<path
						d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"
					/>
				</svg>
			</a>
		</div>
	</footer>
</main>
