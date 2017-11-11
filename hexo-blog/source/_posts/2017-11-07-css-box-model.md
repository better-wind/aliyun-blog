title: 'css-Box-Model'
date: 2017-11-07 09:56:43
tags:
    - css
---

css-box 总结
<!--more-->

### 盒模型的计算
盒模型 规定了元素框处理元素内容、内边距、边框 和 外边距 的方式 

盒模型 宽高的计算
box-sizing 属性可以通俗的理解为 给box设置的宽高从哪里开始计算 
盒模型的真实宽高 = border-box + padding-box + content-box

box-sizing: content-box(标准盒模型)  表示设置的宽高是 content-box的宽高 那渲染在页面上真实的宽高还要加上 padding-box 和 border-box
width(真实) = width(content-box设置的width) + padding-box + border-box

box-sizing: border-box(IE盒模型)   表示设置的宽高是 border-box的宽高 那渲染在页面上真实的宽高就是 设置的宽高
width(真实) = width(设置的width) 

box-sizing: inherit 从父元素继承 

### BFC && IFC
BFC 块级格式化上下文
可以通过构建BFC 解决margin 重合 清除浮动
float的值不为none
position的值不为static或者relative
display的值为 table-cell, table-caption, inline-block, flex, 或者 inline-flex中的其中一个
overflow的值不为visible

IFC 内联格式化上下文
默认对齐方式 vertical-align:baseline 所以同时存在有内容的内联元素和没内容的内联元素 有内容的 会往下掉
vertical-align:top


### 背景的起始

background-clip 表示背景在盒模型中显示的位置
border-box  从border-box开始有背景
padding-box 从padding-box开始有背景
content-box 从content-box开始有背景
background-origin 表示背景在盒模型中开始渲染的位置
border-box 背景从border-box 处开始渲染
padding-box 背景从padding-box 处开始渲染
content-box 背景从content-box 处开始渲染

background-position 表示从这张背景图片的什么位置 开始渲染在 元素背景上
background-position:X% Y%(百分比值) 表示会把图片 横向X% 纵向的Y% 的点与 元素 横向X% 纵向的Y%点对齐
background-position:Xpx Ypx(数值)  表示图片距离背景起始绘制点的距离   

background-position: <background-origin> <background-clip> <background-position>/<background-size>


