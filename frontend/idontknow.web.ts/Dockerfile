FROM node:boron
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN npm install && npm install -g yarn serve
RUN yarn
COPY . .
RUN yarn build
RUN cd build
EXPOSE 5000
RUN yarn global add serve
CMD ["serve", "-s", "build"]