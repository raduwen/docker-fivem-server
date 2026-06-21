# docker-fivem-server

[FiveM](https://fivem.net/) サーバー用 Docker イメージです。

FiveM は GTA V 向けのマルチプレイヤー改造フレームワークです。イメージのビルドには [FiveM Artifacts](https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/) から Linux 向けサーバーバイナリを取得しています。

## イメージの取得

GitHub Container Registry で公開しています。

https://github.com/raduwen/docker-fivem-server/pkgs/container/fivem-server

### 最新版を取得

```bash
docker pull ghcr.io/raduwen/fivem-server:latest
```

### バージョンを指定して取得

```bash
docker pull ghcr.io/raduwen/fivem-server:12345
```

バージョン番号は FiveM Artifacts のビルド番号に対応しています。

> [!WARNING]
> 全てのバージョンのイメージを提供しているわけではありません。毎週自動ビルドされた時点での最新バージョンのみが利用可能です。

## イメージの更新

毎週月曜日に最新の FiveM artifact を取得して自動ビルド・プッシュされます。
