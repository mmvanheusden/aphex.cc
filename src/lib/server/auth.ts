import { getRequestEvent } from "$app/server";
import {
	BETTER_AUTH_SECRET,
	OAUTH_CLIENT_ID,
	OAUTH_CLIENT_SECRET,
	OAUTH_DISCOVERY_URL,
} from "$env/static/private";
import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";
import { sveltekitCookies } from "better-auth/svelte-kit";

export const auth = betterAuth({
	plugins: [
		genericOAuth({
			config: [
				{
					clientId: OAUTH_CLIENT_ID,
					clientSecret: OAUTH_CLIENT_SECRET,
					discoveryUrl: OAUTH_DISCOVERY_URL,
					providerId: "oauth",
					scopes: ["profile", "openid", "email"],
				},
			],
		}),
		sveltekitCookies(getRequestEvent), // make sure this is the last plugin in the array
	],
	secret: BETTER_AUTH_SECRET,
});
