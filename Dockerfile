FROM node:8.10.0-alpine

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

COPY . .

RUN npm run client-install

RUN cd client && npm run build

ENV NODE_ENV=production

EXPOSE 5000

CMD ["npm","run","dev"]
