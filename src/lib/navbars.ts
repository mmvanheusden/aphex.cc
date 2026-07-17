import type { ResolvedPathname } from "$app/types";

import { resolve } from "$app/paths";

export type NavbarItem = {
	icon?: string;
	path: ResolvedPathname | string;
	title: string;
};
export const navbars = {
	contact: [
		{ path: resolve("/"), title: "Home" },
		// { title: "Contact", path: resolve("/contact") },
	],
	default: [
		{ path: resolve("/contact"), title: "Contact" },
		{
			icon: "pixel:linkedin",
			path: "https://linkedin.com/in/mmvanheusden/",
			title: "LinkedIn",
		},
	],
} satisfies Record<string, NavbarItem[]>;

export type NavbarVariant = keyof typeof navbars;
