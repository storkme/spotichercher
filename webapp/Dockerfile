FROM node:12.16.1 AS dev

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

# use --no-progress to cut down on console output during builds in CI
RUN npm run build -- --no-progress

FROM nginx:1.17.8 as prod
COPY --from=dev /app/dist/spotichercher /usr/share/nginx/html
