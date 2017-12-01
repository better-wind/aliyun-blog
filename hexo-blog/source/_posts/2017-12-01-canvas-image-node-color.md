title: '根据图片色调生成渐变背景'
date: 2017-12-01 10:00:00
tags:
    - node
    - canvas
---
有这么个需求
有个容器 容器里面有个图片
容器的背景需要根据图片的颜色渐变显示
让整个风格不突兀
<!--more-->
### What Color
首先很明确 怎么提取图片中的颜色
canvas getImageData 可以获取图片中每个像素点的rgb值
通过一系列的 计算可以获取到 出现最多的几种颜色
此处省略好多字(代码下次补)

### And Then
假设我们拿到颜色了 结束

但是如果没拿到呢

总所周知 canvas 的getImageData 是不能处理跨域图片
当然如果图片的服务器 指定了 Access-Control-Allow-Origin *
那么 通过 img.crossOrigin = "Anonymous" 就可以获取

但是我的项目 需要的图片是某云音乐里拉出来图片
妥妥的跨域
好在 我的项目是通过node部署的 
所以我是通过node中间转了一层 
由node服务去请求 图片 然后再 返给前端
这样就不存在跨域的 行为了


