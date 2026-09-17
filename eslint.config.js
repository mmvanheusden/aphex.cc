import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import perfectionist from "eslint-plugin-perfectionist";
import svelte from "eslint-plugin-svelte";
import { defineConfig, includeIgnoreFile } from "eslint/config";
import globals from "globals";
import path from "node:path";
import ts from "typescript-eslint";

const gitignorePath = path.resolve(import.meta.dirname, ".gitignore");

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	ts.configs.recommended,
	svelte.configs.recommended,
	prettier,
	svelte.configs.prettier,
	perfectionist.configs["recommended-natural"],
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			"no-undef": "off",
		},
	},
	{
		files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
		languageOptions: {
			parserOptions: {
				extraFileExtensions: [".svelte"],
				parser: ts.parser,
				projectService: true,
			},
		},
	},
	{
		// Override or add rule settings here, such as:
		// 'svelte/button-has-type': 'error'
		rules: {
			"perfectionist/sort-imports": [
				"warn",
				{
					order: "asc",
					type: "natural",
				},
			],
		},
	},
	{
		rules: {
			"perfectionist/sort-array-includes": "warn",
			"perfectionist/sort-classes": "warn",
			"perfectionist/sort-enums": "warn",
			"perfectionist/sort-exports": "warn",
			"perfectionist/sort-heritage-clauses": "warn",
			"perfectionist/sort-imports": "warn",
			"perfectionist/sort-interfaces": "warn",
			"perfectionist/sort-jsx-props": "warn",
			"perfectionist/sort-maps": "warn",
			"perfectionist/sort-modules": "warn",
			"perfectionist/sort-named-exports": "warn",
			"perfectionist/sort-named-imports": "warn",
			"perfectionist/sort-object-types": "warn",
			"perfectionist/sort-objects": "warn",
			"perfectionist/sort-sets": "warn",
			"perfectionist/sort-switch-case": "warn",
			"perfectionist/sort-union-types": "warn",
			"perfectionist/sort-variable-declarations": "warn",
		},
	},
);
