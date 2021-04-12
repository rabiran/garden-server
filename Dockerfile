FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm config set strict-ssl=false
RUN npm install
COPY . .

EXPOSE 3005
CMD [ "npm", "start" ]