<script lang="ts">
	import type { Project } from '$lib/data/projects';
	let { projects }: { projects: Project[] } = $props();
	let index = $state(0);
	const position = $derived(Math.min(index, Math.max(0, projects.length - 1)));
	const project = $derived(projects[position]);

	function move(direction: number) {
		index = (position + direction + projects.length) % projects.length;
	}
</script>

{#if project}
	<section id="projects" class="project-section" aria-labelledby="projects-heading">
		<div class="section-heading">
			<h2 id="projects-heading" class="eyebrow">
				Featured {projects.length === 1 ? 'Project' : 'Projects'}
			</h2>
			{#if projects.length > 1}
				<div class="project-controls" aria-label="Project selection">
					<button
						class="control"
						type="button"
						aria-label="Previous project"
						onclick={() => move(-1)}>←</button
					>
					<span class="project-position"
						>{String(position + 1).padStart(2, '0')} / {String(projects.length).padStart(
							2,
							'0'
						)}</span
					>
					<button class="control" type="button" aria-label="Next project" onclick={() => move(1)}
						>→</button
					>
				</div>
			{/if}
		</div>
		<article class="glass project-card" aria-labelledby="project-name">
			<div class="project-identity" aria-hidden="true">
				{#if project.icon === 'flame'}
					<svg viewBox="0 0 64 80" fill="none">
						<path
							d="M35 3C39 22 16 24 24 42C14 39 11 32 11 32C-5 55 9 75 31 76C56 77 70 47 48 25C50 41 42 44 40 45C46 24 35 3 35 3Z"
							stroke="currentColor"
							stroke-width="2"
							stroke-linejoin="round"
						/>
						<path
							d="M32 48C35 57 22 60 26 69C16 65 20 53 25 51C24 56 28 57 28 57L32 48Z"
							fill="currentColor"
						/>
					</svg>
				{:else}
					<span class="project-monogram">{project.name.slice(0, 2)}</span>
				{/if}
				<span class="project-identity-label">{project.id}</span>
			</div>
			<div class="project-copy">
				<div aria-live="polite" aria-atomic="true">
					<p class="project-label">{project.label}</p>
					<h3 id="project-name">{project.name}</h3>
				</div>
				<p class="project-description">{project.description}</p>
				<ul class="tech-list" aria-label="Project technologies">
					{#each project.technologies as technology (technology)}
						<li>{technology}</li>
					{/each}
				</ul>
				<p class="project-validation">{project.validation}</p>
				<a
					href={project.href}
					target="_blank"
					rel="external noopener noreferrer"
					class="btn btn-secondary"
				>
					View on GitHub <span aria-hidden="true">↗</span><span class="sr-only">
						(opens in a new tab)</span
					>
				</a>
			</div>
		</article>
	</section>
{/if}
