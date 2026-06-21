.PHONY: build push
build:
	VERSION=$(VERSION) mise run build

push:
	VERSION=$(VERSION) mise run push
