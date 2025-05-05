VERSION ?= 14758

.PHONY: build
build:
	docker build -t raduwen/fivem-server:${VERSION} --build-arg FIVEM_VERSION=${VERSION} .
