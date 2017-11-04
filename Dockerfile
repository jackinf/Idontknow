FROM node:boron
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN npm install -g yarn
RUN yarn
COPY . .
RUN npm run build
EXPOSE 9000
CMD ["npm", "run", "serve"]