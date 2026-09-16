import type { NavbarVariant } from "$lib/client/navbars";

import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
	return {
		navbarVariant: "default" as NavbarVariant,
	};
};
