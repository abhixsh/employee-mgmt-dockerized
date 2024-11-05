# Stage 1: Build
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install

# Stage 2: Production
FROM node:18
WORKDIR /app
COPY --from=build /app .
CMD ["node", "index.js"]
