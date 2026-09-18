FROM node:26-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:26-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY --from=builder /app/drizzle.config.ts drizzle.config.ts
COPY --from=builder /app/src/lib/server/db ./src/lib/server/db
COPY docker-entrypoint.sh ./docker-entrypoint.sh
COPY package.json .
RUN chmod +x ./docker-entrypoint.sh
EXPOSE 3000
ENV NODE_ENV=production
ENTRYPOINT ["./docker-entrypoint.sh"]