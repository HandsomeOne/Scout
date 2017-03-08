FROM node:6
MAINTAINER i@handsomeone.com

WORKDIR /app
COPY . /app
RUN yarn && yarn build

EXPOSE 3001
ENTRYPOINT ["node", "./server"]
