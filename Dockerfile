FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

ENV NODE_ENV=development
RUN npm install

COPY . .

RUN npx tsup src/app.ts --out-dir dist --format cjs

ENV NODE_ENV=production
RUN npm prune --production

ENTRYPOINT ["docker-entrypoint.sh"]
# CMD ["npm", "run", "start:dev"]

