# syntax=docker/dockerfile:1

FROM node:24-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY tsconfig.json vite.config.ts package.json ./
COPY public ./public
COPY src ./src
COPY resources ./resources
RUN npm run build && npm prune --production

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 akvns

COPY --from=builder /app/.output ./.output
COPY .env ./.env
COPY package.json ./package.json

USER akvns

CMD ["npm", "run", "start"]
