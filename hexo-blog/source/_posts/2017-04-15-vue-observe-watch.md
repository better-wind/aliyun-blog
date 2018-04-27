title: '浅析vue数据响应'
date: 2017-04-15 20:16:29
tags:
    - vue
---
Vue相关-整理中
<!--more-->
模板解析 指令解析
数据劫持过程中
监听 set 和 get
get 过程时 判断是否在模板解析时用到数据
通知 Dep 收集 当前 属性 的监听
watch 中 往 dep中添加 要收集的订阅

set 时 
Dep 通知 watch 可以发布订阅
watch 发布订阅  
