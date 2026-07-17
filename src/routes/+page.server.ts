import { error } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";

import buttons from "../lib/assets/buttons.json";
import projects from "../lib/assets/projects.json";

export const load: PageServerLoad = async () => {
	if (projects && buttons) {
		return {
			buttons: buttons,
			projects: projects,
		};
	}

	error(404, "Not found");
};
