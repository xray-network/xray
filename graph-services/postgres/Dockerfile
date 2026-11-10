#############################################################################################
### POSTGRES  WITH PG_CARDANO AND TIMESCALE_DB EXTENSION ###

FROM timescale/timescaledb-ha:pg17 AS postgres

# Install deps
USER root
RUN apt-get update && apt-get install -y curl sudo

# Install PG_CARDANO extension
RUN mkdir /root/tmp
COPY config/pg_cardano_install.sh /root/tmp
RUN chmod +x /root/tmp/pg_cardano_install.sh
RUN /root/tmp/pg_cardano_install.sh

# Switch back to postgres user
USER postgres
