title: 'node-sms-boom'
date: 2017-11-13 09:27:44
tags:
    - node
---
利用puppeteer进行短信轰炸
<!--more-->
### puppeteer 
安装 
ERROR: Failed to download Chromium r508693! Set "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD" env variable to skip download.

原因 安装 puppeteer 时会去下载 chromium（实验版chrome），但是由于网络的原因，下载失败了

解决 
win npm config set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
linux export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD = true

linux centos 7.3 下载chromium 失败 待解决

http://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html
从这里下载 http://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html?prefix=Linux_x64/515411/
/admin/fenghou/www/chrome/chrome-linux/chrome