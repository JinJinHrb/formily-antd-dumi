#!/bin/bash
source /etc/profile
echo "[INFO] 开始文档打包 ..."
nvm install v16.14.0 && nvm use v16.14.0

#默认是yarn安装
pnpm install
pnpm docs:build