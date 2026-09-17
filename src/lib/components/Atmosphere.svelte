<script lang="ts">
	import { asset } from '$app/paths';
	let { scene = 'home' }: { scene?: 'home' | 'error' } = $props();
</script>

<div class="atmosphere" class:error-scene={scene === 'error'} aria-hidden="true">
	<picture>
		<source
			media="(max-width: 640px)"
			srcset={scene === 'home'
				? asset('/assets/lakeside-home-mobile.webp')
				: asset('/assets/lakeside-error-mobile.webp')}
		/>
		<img
			src={scene === 'home'
				? asset('/assets/lakeside-home.webp')
				: asset('/assets/lakeside-error.webp')}
			alt=""
			width="1672"
			height="941"
			fetchpriority="high"
		/>
	</picture>
</div>
