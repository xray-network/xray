#############################################################################################
### KOIOS-TINY ###

FROM alpine:latest AS koios-tiny

# Env vars
ARG NETWORK
ARG CARDANO_NODE_ID
ENV NETWORK=${NETWORK}
ENV CARDANO_NODE_ID=${CARDANO_NODE_ID}

# Installing packages...
RUN apk add --no-cache dcron libcap bash nano jq git postgresql-client

# Setting PGPASSFILE global ENV
ENV \
  HOME=/home/postgres \
  PGPASSFILE=/home/postgres/.pgpass

# Copying config & files
WORKDIR /home/postgres
COPY --from=postgrest/postgrest /bin/postgrest /bin
COPY koios-tiny/config/postgrest.conf .
COPY koios-tiny/koios/entrypoint.sh .
COPY volumes/cardano-node-${NETWORK}-${CARDANO_NODE_ID}/config cardano-configurations

COPY koios-tiny/koios/koios-artifacts/files/grest/rpc rpc
COPY koios-tiny/koios/extra-rpc rpc/extra-rpc

COPY koios-tiny/koios/koios-artifacts/files/grest/cron/jobs cron
COPY koios-tiny/koios/extra-cron-jobs cron
COPY koios-tiny/koios/cron-schedule /var/spool/cron/crontabs/postgres

# Adding permissions and setting the cron to run as the "postgres" user
RUN chmod +x cron/*
RUN chown -R postgres:postgres /home/postgres
RUN chown -R postgres:postgres /etc/crontabs
RUN mkdir -p /var/run && \
    chown postgres:postgres /var/run && \
    touch /var/run/crond.pid && \ 
    chown postgres:postgres /var/run/crond.pid && \
    chown postgres:postgres /usr/sbin/crond && \
    setcap cap_setgid=ep /usr/sbin/crond

# Switching user 
USER postgres

# Setting up an exposed port and starting a container
EXPOSE 8050/tcp
ENTRYPOINT ["./entrypoint.sh"]


#############################################################################################
### OGMIOS-PROXY ###

FROM node:20 AS koios-tiny-ogmios-proxy

WORKDIR /usr/src/app

COPY ogmios-proxy .
RUN yarn install

EXPOSE 8700/tcp
CMD [ "node", "index.js" ]


#############################################################################################
### KOIOS-TINY-RAPIDOC ###

FROM node:20 AS koios-tiny-rapidoc

WORKDIR /usr/src/app

COPY koios-tiny/rapidoc .
RUN yarn install

EXPOSE 2700/tcp
CMD [ "node", "index.js" ]
