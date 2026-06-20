FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run payload generate:types
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# OpenShift runs as arbitrary UID — group write access needed
RUN chown -R node:node /app && chmod -R g+w /app

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# Copy startup script and make executable
COPY --chown=node:node startup.sh ./startup.sh
RUN chmod +x startup.sh

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

USER node
CMD ["sh", "startup.sh"]