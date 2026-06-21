# docker-fivem-server

Docker image for [FiveM](https://fivem.net/) server.

FiveM is a multiplayer modification framework for GTA V. The image is built using Linux server binaries downloaded from [FiveM Artifacts](https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/).

## Pull the Image

The image is available on GitHub Container Registry.

https://github.com/raduwen/docker-fivem-server/pkgs/container/fivem-server

### Pull the latest version

```bash
docker pull ghcr.io/raduwen/fivem-server:latest
```

### Pull a specific version

```bash
docker pull ghcr.io/raduwen/fivem-server:12345
```

The version number corresponds to the build number on FiveM Artifacts.

> [!WARNING]
> Not all versions are available. Only the latest version at the time of each weekly automated build is provided.

## Image Updates

The image is automatically built and pushed every Monday with the latest FiveM artifact.
