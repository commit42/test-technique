FROM node:12

WORKDIR /home/node/app
COPY package*.json /home/node/app/
RUN npm install
RUN npm install axios
RUN npm install papaparse


CMD npm start
EXPOSE 9000
