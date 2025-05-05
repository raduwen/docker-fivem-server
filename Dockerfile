FROM ubuntu:24.04

ENV FIVEM_MASTER_URL="https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/"
ARG FIVEM_VERSION=14758

RUN apt-get update && \
  apt-get -y install --no-install-recommends xz-utils tar ca-certificates wget && \
  rm -rf /var/lib/lists/*

RUN mkdir -p /opt/fivem
WORKDIR /opt/fivem
RUN wget -q -nc --show-progress --progress=bar:force:noscroll ${FIVEM_MASTER_URL}$(wget -q -O - ${FIVEM_MASTER_URL} | grep ${FIVEM_VERSION} | head -n 1 | cut -d '"' -f 4 | cut -c 2-) && \
  tar Jxfv fx.tar.xz && \
  rm -R fx.tar.xz

CMD ./run.sh
