# Written by sshboard: built in two stages, so the build tools and dev dependencies stay
# out of the image, and the app runs as an unprivileged user that cannot change its own
# code. Secrets are not built in: the server's .env is given at run time (compose.yaml).
# The file is yours to edit; sshboard shows any change of its own before writing it.

FROM node:24.22.3-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm prune --omit=dev

FROM node:24.22.3-slim
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app ./
USER node
EXPOSE 3000
CMD ["npm", "start"]
