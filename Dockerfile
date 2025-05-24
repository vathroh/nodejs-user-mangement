FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

ENV NODE_ENV=development

COPY . .

# Copy file mapping dan entrypoint
COPY start-scripts.env docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

USER node

ENTRYPOINT ["docker-entrypoint.sh"]
