title: 'https配置的坑'
date: 2018-07-27 09:44:37
tags:
    - nginx
    - linux
---
配置https注意的坑
<!--more-->

### 开启nginx ssl模块
nginx 需要开启ssl模块

/usr/local/nginx/sbin/nginx -V 
查看安装时已经开启的模块信息
like this 	
--prefix=/usr/local/nginx --with-http_stub_status_module
那么 开启ssl配置 
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module

然后make && make install 就ok了
网上说直接这么操作会覆盖掉原来的nginx配置
我这边nginx.conf 的配置什么的都还在 没什么影响
担心被覆盖的 不要执行make install 可以先 克隆下来 
cp /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx.bak
cp ./objs/nginx /usr/local/nginx/sbin/
直接用新的nginx 去替换 sbin里的nginx 就OK了

### 服务器端口开启

唉 在这里寻寻觅觅了小半天不知道https访问不了的原因

https 需要服务器开启443端口的监听

一般的阿里云啊腾讯云啊 都可以配置规则组
但是配完规则组 记得重启服务器


nginx 关闭命令
ps -ef|grep nginx   //查看进程号
//正常停止
kill -QUIT 2072
//快速停止
kill -TERM 2072
kill -INT 2072

//强制停止
pkill -9 nginx










