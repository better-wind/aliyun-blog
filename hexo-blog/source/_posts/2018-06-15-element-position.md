title: '逐渐忘却的DOM操作'
date: 2018-06-15 09:45:42
tags:
    - js
---
以此记录那些用过的dom操作
<!--more-->

### 获取元素定位

dom.clientWidth dom.offsetWidth 在不同的盒模型下表现不一致
border-box
dom.clientWidth = 设置的width - border-width
dom.offsetWidth = 设置的width

content-box
dom.clientWidth = 设置的width + padding-width
dom.offsetWidth = 设置的width + padding-width + border-width


dom.clientLeft  dom.offsetLeft 在不同的盒模型下表现一致
dom.clientLeft = border-left-width
dom.offsetLeft = 左边框外侧到 已定位父元素左边框内侧

dom.scrollWidth = 滚动区真实的width + padding-width
dom.scrollTop =  滚动区已经滚动卷去的高度



dom.getBoundingClientRect().width 和 dom.offsetWidth 表现一致
dom.getBoundingClientRect().top 返回元素在文档流中的高度



