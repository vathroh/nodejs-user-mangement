FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

USER node

COPY . .

ENV NODE_ENV=${NODE_ENV:-development}

CMD [ "npm", "run", "start:dev" ]
