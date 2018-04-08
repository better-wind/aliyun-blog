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

> 1、查看当前git版本：git --version
  查看最新版git：访问https://www.kernel.org/pub/software/scm/git/
  或者https://github.com/git/git/releases
  2、官网下载：
  wget https://Github.com/Git/Git/archive/v2.11.0.tar.gz
  （建议本机迅雷下载rz到服务器,安装yum install lrzsz后rz即可）
  解压：tar -zxvf git-2.11.0.tar.gz
  3、cd git-2.11.0
  4、移除旧版本git：yum remove git
  5、make configure
  如果报错/bin/sh: autoconf: command not found：
  安装libtool即可：yum install install autoconf automake libtool
  正常会打印：GEN configure
  执行
  6、./configure --prefix=/usr/local/git --with-iconv =/usr/local/lib（建议优先尝试后者）
  或者
  ./configure --prefix=/usr/local/git --with-iconv --with-curl --with-expat=/usr/local/lib（如果没有安装libiconv请自行安装）
  make && make install
  ①如果报错：cache.h:40:18: fatal error: zlib.h: No such file or directory
  安装zlib：yum install zlib、yum install zlib-devel
  ②如果报错：make[1]: *** [perl.mak] Error 2
  安装：yum install perl-ExtUtils-MakeMaker package
  7、echo "export PATH=$PATH:/usr/local/git/bin" >> /etc/bashrc
  8、source /etc/bashrc
  9、git --version
  编译git时报错： zlib.h: No such file or directory
      缺少 zlib的头文件， 开发包没装，
      yum install zlib （系统默认已经装上）
      yum install zlib-devel 
  git clone时候提示fatal: Unable to find remote helper for 'https'
  yum install libcurl-devel
  然后按照上诉步骤重新安装编译git即可


[Linux安装git](https://www.cnblogs.com/lhbryant/p/6928894.html)
那么这解决问题的过程 就比解决问题来的跟有用
前提是问题是你自己解决的


