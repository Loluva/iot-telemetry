FROM node:24-alpine
WORKDIR /home/app
COPY ./package*.json .
EXPOSE 3000
RUN npm install
COPY . .
CMD [ "npm","run","dev" ]