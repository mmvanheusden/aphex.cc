import type { auth } from "$lib/server/auth";

declare global {
	namespace App {
		interface Locals {
			session: null | typeof auth.$Infer.Session.session;
			user: null | typeof auth.$Infer.Session.user;
		}
	}
}

export {};
