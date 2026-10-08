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
				<span class="project-position">
					{String(position + 1).padStart(2, '0')}
					/
					{String(projects.length).padStart(2, '0')}
				</span>
			{/if}
		</div>
		<article class="glass project-card" aria-labelledby="project-name">
			<div class="project-identity" aria-hidden="true">
				{#if project.icon}
					<span class="project-logo-frame">
						<svg class="project-logo" class:chora-icon={project.id === 'chora'} aria-hidden="true">
							<use href={project.icon + '#logo'} />
						</svg>
					</span>
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
			{#if projects.length > 1}
				<div class="project-controls" aria-label="Project selection">
					<button
						class="control"
						type="button"
						aria-label="Previous project"
						onclick={() => move(-1)}>←</button
					>
					<button class="control" type="button" aria-label="Next project" onclick={() => move(1)}
						>→</button
					>
				</div>
			{/if}
		</article>
	</section>
{/if}
