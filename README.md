# aphex.cc

https://aphex.cc website

### Development

#### Initializing DB

Create DB and push schema by running `npx drizzle-kit push`. This should be ran in Docker as well.
OR run `npm run init_db`.

#### Schema

Update the Drizzle schema (when a DB/auth related dependency updates, or a configuration changes), with `npx auth@latest generate --output src/lib/server/db/auth_schema.ts`.
