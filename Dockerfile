FROM node:argon

# make app dir
RUN mkdir -p /usr/src/veritas
WORKDIR /usr/src/veritas

COPY package.json /usr/src/veritas/
RUN npm install

# Bundle app source
COPY . /usr/src/veritas
EXPOSE 3000
CMD [ "npm", "start" ]
