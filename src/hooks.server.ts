import type { Handle } from "@sveltejs/kit";

import { building } from "$app/environment";
import { auth } from "$lib/server/auth";
import { initHassioZones } from "$lib/server/home_assistant";
import { svelteKitHandler } from "better-auth/svelte-kit";

void initHassioZones().catch((cause) => {
	console.error("Failed to initialize Home Assistant zones", cause);
});

export const handle: Handle = async ({ event, resolve }) => {
	// Fetch current session from Better Auth
	const session = await auth.api.getSession({
		headers: event.request.headers,
	});

	// Make session and user available on server
	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	return svelteKitHandler({ auth, building, event, resolve });
};
