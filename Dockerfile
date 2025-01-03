FROM node:18-buster as builder

COPY package.json package.json

RUN npm install

WORKDIR /code

COPY .next /code/.next
COPY public /code/public
COPY package.json /code/
COPY tsconfig.json /code/

#RUN npm install next@latest react@latest react-dom@latest

EXPOSE 3000

CMD ["npx","next","start"]