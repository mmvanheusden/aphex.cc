import { error } from "@sveltejs/kit";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import type { PageServerLoad } from "./$types";

import buttons from "../lib/assets/buttons.json";
import projects from "../lib/assets/projects.json";

export const load: PageServerLoad = async () => {
	const BIRTHDAY = dayjs("2008-03-05");
	const age = dayjs().diff(dayjs(BIRTHDAY), "year");

	if (projects && buttons) {
		return {
			age: age,
			buttons: buttons,
			projects: projects,
		};
	}

	error(404, "Not found");
};
