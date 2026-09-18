#!/bin/sh
set -eu

echo "Initializing/updating database..."
npx drizzle-kit push

echo "Starting SvelteKit..."
exec node build