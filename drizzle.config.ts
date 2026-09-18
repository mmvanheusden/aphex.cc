import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dbCredentials: {
		url: "file:aphex.db",
	},
	dialect: "sqlite",
	out: "./drizzle",
	schema: "./src/lib/server/db/auth_schema.ts",
});
