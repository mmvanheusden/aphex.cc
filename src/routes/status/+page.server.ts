import { HOMEASSISTANT_ENTITY, HOMEASSISTANT_TOKEN, HOMEASSISTANT_URL } from "$env/static/private";
import { getHassioZones } from "$lib/server/home_assistant";
import { error } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";

type HomeAssistantTrackerState = {
	attributes: {
		[key: string]: unknown;
		device_class?: string;
		friendly_name?: string;
		in_zones: string[];
		last_seen: Date;
		latitude: number;
		longitude: number;
		unit_of_measurement?: string;
	};
	entity_id: string;
	last_changed: string;
	last_updated: string;
	state: string;
};

export const load: PageServerLoad = async ({ fetch }) => {
	const zones_map = getHassioZones();
	const url = `${HOMEASSISTANT_URL}/api/states/` + encodeURIComponent(HOMEASSISTANT_ENTITY);

	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${HOMEASSISTANT_TOKEN}`,
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw error(response.status, `Home Assistant returned ${response.status}`);
	}

	const sensor = (await response.json()) as HomeAssistantTrackerState;

	return {
		position: {
			lastSeen: sensor.attributes.last_seen,
			latitude: sensor.attributes.latitude,
			longitude: sensor.attributes.longitude,
			zone: zones_map!.find((zone) => zone.id === sensor.attributes.in_zones[0])
				?.friendly_name,
		},
	};
};
