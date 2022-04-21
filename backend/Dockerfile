FROM node

WORKDIR /eat-what-v1

RUN npm install -g forever

COPY ./package.json /eat-what-v1/

RUN npm install

COPY . /eat-what-v1/

EXPOSE 3000 8089

CMD forever /eat-what-v1/src/app.js
