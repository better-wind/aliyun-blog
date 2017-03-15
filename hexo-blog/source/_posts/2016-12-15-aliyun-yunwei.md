title: '学点运维，配个服务器'
date: 2016-12-15 19:04:25
tags:
    - linux
    - node
---
![aliyun](http://imgs.ebrun.com/resources/2016_11/2016_11_23/2016112329114798900788972.png)
<!--more-->

前段时间和同事合租了一个阿里云服务器，60几块钱一个月。
服务器上的资源环境很多都是他配的，
作为前端，只是在上面放点静态的东西，也没太大兴趣在这方面去摸索
然后这货今天离职了。

走之前，悠悠然发了我一个连接
阿里云搞活动 服务器免费赠送6个月

果断入手(要买个9块钱的套餐)
然后
买域名
解析DNS
配nginx
装git
搭node

也算是小入门了


----
But 我想说的是
作为一个开发人员and 一个合格的开发人员
首先具备的应该是解决问题，查找问题的能力

而不是一有问题不假思索的问别人
有时候多学一样本领,就早说一句求人的话

作为我们作为初学者
总会碰到各种各样的问题
那么，怎么解决？

## 举个栗子

linux git的安装

忽略前面下载解压过程

> ./configure –prefix=/usr/local
  make & make install

果断报错。。
OK 下载各种依赖
报错
继续
安装成功
git –version
嗯 有版本号
easy嘛
然后 来 git clone ..
error:fatal: Unable to find remote helper for ‘https’
又报错，奔溃

这是因为Git环境没有安装完全，需要重新安装

> ./configure –prefix=/usr/local
  make all doc
  make install install-doc install-man install-html

继续 OK
问题解决

那么这解决问题的过程 就比解决问题来的跟有用
前提是问题是你自己解决的


