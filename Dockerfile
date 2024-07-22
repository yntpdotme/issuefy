# ---- Base Node ----
FROM node:22-alpine AS base
EXPOSE 3000

# ---- Build Stage ----
FROM base AS builder
WORKDIR /app

# Install pnpm globally 
RUN npm install -g pnpm 

# Install dependencies
COPY package.json pnpm-lock.yaml ./ 
COPY src/prisma ./src/prisma
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Disable Next.js Telemetry 
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN pnpm run build

# ---- Production Stage ----
FROM base AS runner
WORKDIR /app

# Install pnpm globally 
RUN npm install -g pnpm 

# Create a non-root user for security
RUN addgroup -S issuefy && adduser -S issuefy -G issuefy

# Copy only necessary build files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/src/prisma ./src/prisma

RUN chown -R issuefy:issuefy /app

# Set environment to production
ENV NODE_ENV=production

# Switch to non-root user
USER issuefy

# Run the application in production mode
CMD ["sh", "-c", "pnpm dlx prisma migrate deploy && node server.js"]