FROM node:12.14.1-stretch-slim
WORKDIR /code
ADD package.json .
RUN npm install
COPY . .

ENV SSH_PASSWD "root:Docker!"
RUN apt-get update \
        && apt-get install -y  openssh-server \
	&& echo "$SSH_PASSWD" | chpasswd 

COPY sshd_config /etc/ssh/
COPY init.sh /usr/local/bin/
RUN chmod 775 /usr/local/bin/init.sh

EXPOSE 3000 2222
ENTRYPOINT ["/usr/local/bin/init.sh"]