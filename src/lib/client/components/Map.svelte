<script lang="ts">
	import { Map, Marker, Popup, TileLayer } from "sveaflet";

	type MapProps = {
		center: [number, number];
		zoom: number;
	};

	let { center, zoom }: MapProps = $props();
</script>

<Map
	options={{
		center: center,
		zoom: zoom,
	}}
>
	<TileLayer url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"} />
	<Marker latLng={center}>
		<Popup
			options={{
				content: "Hi",
			}}
		></Popup>
	</Marker>
</Map>
