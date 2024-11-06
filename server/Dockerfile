FROM node:20-alpine

COPY . /app

WORKDIR /app

RUN npm install

#Describe which ports your application is listening on.
EXPOSE 8080

CMD ["node", "server.js"]