FROM node:14.15.0-buster
EXPOSE 80
EXPOSE 8080

RUN apt-get update && \
    apt-get install -y --force-yes zlib1g zlib1g-dev
RUN npm install -g gatsby-cli

COPY entrypoint.sh /
RUN mkdir -p /app/public
WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
ENV ENABLE_GATSBY_REFRESH_ENDPOINT=1
ENV STRAPI_ENDPOINT=https://strapi.131.1.216.224.nip.io

ENV KEYCLOAK_REALM=appaltinnovativi
ENV KEYCLOAK_AUTH_URL=https://keycloak.131.1.216.224.nip.io/auth
ENV KEYCLOAK_AUTH_CLIENT_ID=gatsby-appaltinnovativi

RUN apt update
RUN apt install -y nginx python3 python3-pip
RUN pip3 install flask
RUN mv /app/flask_run.py /
RUN mv /app/gatsby_refresh.bash /
RUN chmod u+x /gatsby_refresh.bash
RUN chmod u+x /flask_run.py

RUN chmod u+x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
