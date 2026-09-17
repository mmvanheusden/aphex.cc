<script lang="ts">
	import { PUBLIC_MAPBOX_API_KEY } from "$env/static/public";
	import { authClient } from "$lib/client/auth_client";
	import { controls, Map, Marker } from "@beyonk/svelte-mapbox";
	const { GeolocateControl, NavigationControl } = controls;
	import dayjs from "dayjs";
	import utc from "dayjs/plugin/utc";

	import type { PageData } from "./$types";
	dayjs.extend(utc);

	let mapComponent = $state();

	let { data }: { data: PageData } = $props();

	const session = authClient.useSession();
</script>

{#if $session.data}
	<section class="mt-6 sm:mt-8">
		<h1 class="font-big text-3xl font-extrabold sm:text-4xl">Position</h1>
		<div class="mx-2 mt-2 text-base sm:text-lg">
			<div>
				<div style="width:100%;height:500px;">
					<Map
						bind:this={mapComponent}
						accessToken={PUBLIC_MAPBOX_API_KEY}
						options={{ scrollZoom: true }}
						center={[data.position.longitude, data.position.latitude]}
						zoom="14"
					>
						<Marker
							lat={data.position.latitude}
							lng={data.position.longitude}
							color="rgb(255,0,0)"
							label="Maarten"
							popupClassName="class-name"
							popup={false}
						/>
						<NavigationControl />
						<GeolocateControl />
					</Map>
				</div>
				<p class="text-md text-gray-300">
					Data from pulled from mobile phone at <b class="italic underline"
						>{dayjs
							.utc(data.position.lastSeen)
							.local()
							.format("D MMMM[ @ ]HH:mm:ss")}</b
					>
				</p>
			</div>
		</div>
	</section>
{:else}
	Not logged in! Please log in.
{/if}
