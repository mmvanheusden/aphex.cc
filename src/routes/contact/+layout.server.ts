import type { NavbarVariant } from "$lib/navbars";

import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
	return {
		navbarVariant: "contact" as NavbarVariant,
	};
};
