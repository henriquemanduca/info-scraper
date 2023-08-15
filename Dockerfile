FROM ghcr.io/puppeteer/puppeteer:latest

ENV NODE_ENV=production CACHE_TTL=60 APP_PORT=3000

EXPOSE 3000

WORKDIR /app

COPY package.json /app

RUN npm install

COPY ./dist /app/src

COPY .sequelizerc sequelize.js /app/

COPY ./src/sequelize /app/src/sequelize

CMD ls && \
    npx sequelize-cli db:migrate && \
    node ./src/index.js
