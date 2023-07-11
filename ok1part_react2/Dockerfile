#You usually start with a base image
#Bullseye is a tag for lts
#Slim is a tag for images that have only the things needed for node and nothing more
FROM node:bullseye-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT=3001

#EXPOSE 3000

CMD [ "npm", "run", "start" ]