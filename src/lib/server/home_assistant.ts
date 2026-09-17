import { HOMEASSISTANT_TOKEN, HOMEASSISTANT_URL } from "$env/static/private";

// Code assisted by AI.

export type HassioZone = {
	friendly_name: string;
	id: string;
};
type HassioEntity = {
	[key: string]: unknown;
	attributes: {
		friendly_name: string;
	};
	entity_id: string;
};

let _data: HassioZone[] | null = null;
let _promise: null | Promise<void> = null;

export function getHassioZones(): HassioZone[] | null {
	return _data;
}

export async function initHassioZones(): Promise<void> {
	if (!_data) {
		if (!_promise) {
			_promise = fetchHassioZones();
		}
		await _promise;
	}
}

async function fetchHassioZones(): Promise<void> {
	const url = `${HOMEASSISTANT_URL}/api/states`;

	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${HOMEASSISTANT_TOKEN}`,
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) throw new Error(`Startup request failed: ${response.status}`);

	const entities = (await response.json()) as HassioEntity[];

	const zones = entities
		.filter((entitiy) => entitiy.entity_id.startsWith("zone."))
		.map((zone) => {
			console.trace(zone);
			return {
				friendly_name: zone.attributes.friendly_name,
				id: zone.entity_id,
			};
		});

	_data = zones;
}
