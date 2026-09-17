<script lang="ts">
	import { authClient } from "$lib/client/auth_client";
	import { type Component, type ComponentProps, onMount } from "svelte";

	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();

	const session = authClient.useSession();

	// Based on https://github.com/GrayFrost/sveaflet/issues/32#issuecomment-3031852071.
	import type Map from "../../lib/client/components/Map.svelte";
	type MapProps = ComponentProps<typeof Map>; // The props type.
	let MapComponentClientSide = $state.raw<Component<MapProps> | null>(null);

	let mapProps: MapProps = $state.raw({
		center: [data.position.latitude, data.position.longitude],
		zoom: 15,
	});

	onMount(async () => {
		const { default: Map } = await import("../../lib/client/components/Map.svelte");
		MapComponentClientSide = Map;
	});
</script>

{#if $session.data}
	<section class="mt-6 sm:mt-8">
		<h1 class="font-big text-3xl font-extrabold sm:text-4xl">Position</h1>
		<div class="mx-2 mt-2 text-base sm:text-lg">
			<div>
				<p>
					Logged in as: {$session.data.user.name}
				</p>

				Maarten is currently at: {data.position.zone}
				As of <b>{data.position.lastSeen}</b>,

				<div style="width:100%;height:500px;">
					{#if MapComponentClientSide}
						{@const Map = MapComponentClientSide}
						<Map {...mapProps} />
					{/if}
				</div>
			</div>
		</div>
	</section>
{:else}
	Not logged in! Please log in.
{/if}
