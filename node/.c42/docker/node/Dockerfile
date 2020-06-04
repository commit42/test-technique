FROM node:12.16

RUN apt-get update
RUN apt-get -y install postgresql-client
RUN mkdir -p /root/.ssh

ENV SSH_AUTH_SOCK=/ssh-agent

WORKDIR /project
VOLUME ["/project"]

RUN yarn install

CMD ["yarn", "start"]
