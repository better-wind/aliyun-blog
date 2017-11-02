title: 'Linux 使用 Mysql'
date: 2017-08-18 10:20:08
tags:
    - linux
    - mysql
---
Linux 中使用 Mysql
记录 
<!--more-->
### 安装
关于安装 完全按着教程走 没有什么大问题
具体的教程 按照 安装的 mysql版本 自行搜索
[linux mysqlx.x.x 安装](https://www.baidu.com/s?wd=linux%20mysql%20%E5%AE%89%E8%A3%85)


### 操作
基本都是数据库原理里面有交的
学校学的时候一开始还用过命令行
后来都是用可视化工具了
全忘光了

>`mysql -uroot -p`  //输入密码后 操作mysql
`show databases;`  //查看库
`create database 库名;` //新建数据库
`use 库名;`  // 打开数据库
`show tables;`  // 显示表
`describe 表名;` // 查看表结构
`drop database 库名;` //删除库
`drop table 表名;` //删除表
//新建库的话 直接导入来的快一点
`mysql -u用户名 -p密码 数据库名 < 数据库名.sql` 导入

不涉及复杂操作的话 这些命令基本够用了 

> 参考
[最全的mysql 5.7.13 安装配置方法图文教程(linux) 强烈推荐!](http://www.jb51.net/article/90317.htm)

