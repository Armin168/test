FROM node:lts-alpine as base
RUN mkdir -p /app && chown -R node:node /app
USER node
WORKDIR /app

LABEL org.opencontainers.image.source https://github.com/Armin168/test

ENV NODE_ENV production

COPY --chown=node:node dist /app/dist
COPY --chown=node:node .npmrc package.json /app/
RUN npm install

EXPOSE 3000
CMD ["node", "dist/main"]