# Multi-stage build for NestJS server with monorepo support
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Dependencies stage
FROM base AS deps
# Copy workspace configuration
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
COPY turbo.json ./

# Copy all package.json files
COPY apps/server/package.json ./apps/server/
COPY packages/shared/package.json ./packages/shared/
COPY packages/typescript-config/package.json ./packages/typescript-config/
COPY packages/eslint-config/package.json ./packages/eslint-config/

# Install dependencies
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Build stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build packages in correct order
RUN npm run build --workspace=@repo/shared
RUN npm run build --workspace=server

# Production stage
FROM base AS runner
WORKDIR /app

# Create app user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Copy workspace structure and create symlink for shared package
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/server/dist ./dist

# Create node_modules/@repo directory and symlink
RUN mkdir -p ./node_modules/@repo
COPY --from=builder /app/packages/shared ./node_modules/@repo/shared

# Set ownership
RUN chown -R nestjs:nodejs /app

USER nestjs

EXPOSE 3001
ENV PORT=3001
ENV NODE_ENV=production

CMD ["node", "dist/main"]
