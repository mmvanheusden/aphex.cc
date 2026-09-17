import { error } from "@sveltejs/kit";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import {
	HOMEASSISTANT_BOOLEAN_ENTITY,
	HOMEASSISTANT_TOKEN,
	HOMEASSISTANT_URL,
} from "$env/static/private";

import type { PageServerLoad } from "./$types";

import buttons from "../lib/client/assets/buttons.json";
import projects from "../lib/client/assets/projects.json";

type HomeAssistantBooleanState = {
	[key: string]: unknown;
	last_changed: Date;
	state: "off" | "on";
};

export const load: PageServerLoad = async () => {
	const BIRTHDAY = dayjs("2008-03-05");
	const age = dayjs().diff(dayjs(BIRTHDAY), "year");
	let science_park = null;

	const url =
		`${HOMEASSISTANT_URL}/api/states/` + encodeURIComponent(HOMEASSISTANT_BOOLEAN_ENTITY);

	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${HOMEASSISTANT_TOKEN}`,
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		const sensor = (await response.json()) as HomeAssistantBooleanState;
		science_park = {
			last_changed: sensor.last_changed,
			present: sensor.state === "on",
		};
	}

	return {
		age: age,
		buttons: buttons,
		projects: projects,
		science_park: science_park,
	};

	error(404, "Not found");
};
