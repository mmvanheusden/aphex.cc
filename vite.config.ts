import adapter from "@sveltejs/adapter-node";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { mdsvex } from "mdsvex";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		tailwindcss(),
		enhancedImages(),
		sveltekit({
			adapter: adapter(),
			compilerOptions: {
				experimental: {
					async: true,
				},
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
			},
			extensions: [".svelte", ".svx", ".md"],
			preprocess: [mdsvex({ extensions: [".svx", ".md"] })],
		}),
	],
});
