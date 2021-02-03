FROM node:12-alpine as build

RUN mkdir /discord-bot
WORKDIR /discord-bot

COPY package* ./
RUN npm ci
COPY . ./
RUN npm run build

FROM node:12-alpine
RUN mkdir /discord-bot
WORKDIR /discord-bot
COPY package* ./
RUN npm ci --production
COPY --from=build /discord-bot/dist ./dist
CMD ["node", "dist/index.js", "-p", "logs/latest.log", "-s"]