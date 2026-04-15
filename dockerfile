FROM node:24-alpine
WORKDIR /home/app
COPY . .
EXPOSE 3000
RUN npm install
CMD [ "npm","run","dev" ]