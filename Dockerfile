FROM node:latest

MAINTAINER csi0n <chqssqll@gmail.com>

RUN mv /etc/apt/sources.list /etc/apt/sources.list.bak && \
    echo "deb http://mirrors.aliyun.com/debian/ jessie main non-free contrib" >/etc/apt/sources.list && \
    echo "deb http://mirrors.aliyun.com/debian/ jessie-proposed-updates main non-free contrib" >>/etc/apt/sources.list && \
    echo "deb-src http://mirrors.aliyun.com/debian/ jessie main non-free contrib" >>/etc/apt/sources.list && \
    echo "deb-src http://mirrors.aliyun.com/debian/ jessie-proposed-updates main non-free contrib" >>/etc/apt/sources.list

ADD . /workspace

WORKDIR /workspace

RUN apt-get update && \
        cd ./client && \
        npm install && \
        npm run build && \
        cd ../server && \
        npm install && \
        npm run build && \
        npm install -g pm2

CMD ["pm2-runtime","start","/workspace/server/build","--","mongodb://mongo/scout"]

EXPOSE 3001
