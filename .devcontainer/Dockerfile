FROM node:22-bullseye as base
WORKDIR /workspaces

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    vim \
    less \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm and turbo globally
RUN npm install -g pnpm@latest


# Developer stage
FROM base AS developer
CMD ["pnpm", "start"]