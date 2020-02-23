FROM node:12.16.1

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

ENTRYPOINT ["npm", "run", "start:prod"]
