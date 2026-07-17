<script lang="ts">
	import type { NavbarItem } from "$lib/navbars";

	import Icon from "@iconify/svelte";

	let { items }: { items: NavbarItem[] } = $props();
</script>

<nav class="flex flex-wrap justify-center gap-3 px-2">
	{#each items as item (item.path)}
		<a href={item.path}>
			<button
				class="btn inline-flex items-center gap-2 text-base btn-primary sm:text-xl"
				tabindex="-1"
			>
				{#if item.icon}
					<Icon icon={item.icon} class="text-lg sm:scale-130" />
				{/if}
				{item.title}
			</button>
		</a>
	{/each}
</nav>
