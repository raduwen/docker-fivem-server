FROM ubuntu:24.04

LABEL org.opencontainers.image.source=https://github.com/raduwen/docker-fivem-server

RUN apt-get update && \
    apt-get install -y --no-install-recommends xz-utils tar ca-certificates curl && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /opt/fivem

ARG FX_URL
RUN curl -fsSL "${FX_URL}" | tar -Jxf -

CMD ["./run.sh"]
