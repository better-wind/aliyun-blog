title: Prepare for the interview
date: 2018-03-05 09:29:55
tags:
    - html
    - css
---

Html && Css
<!--more-->
[Interview-Questions-Answers](https://github.com/Liyuk/Interview-Questions-Answers)
## Html

### html的规范
首先是标签的语义化
语义化 顾名思义就是 什么时候该用什么标签 例如header section footer
接着是标签的嵌套规则
典型的就是 h1-h6 p 标签中不能再嵌套块级元素 原则上行内元素内不能嵌套块级元素

#### meta标签
用于提供页面的元信息 比如
```html
针对搜索引擎 <meta name="robots" content="noarchive" /> 
关键词 <meta name="Keywords" content="关键字" />
描述  <meta name="Description" content="页面的描述" />
重定向 <meta http-equiv="Refresh" content="5;url=https://fenghou.site" />
通知浏览器接收类型 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
网页可视区域的设置 <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no" />
不识别数字为电话号码 <meta content="telephone=no" name="format-detection" />
针对iphone 允许全屏模式浏览 <meta content="yes" name="apple-mobile-web-app-capable" /> 
```
  

## css

### css的规范
css方面的规范 首先体现在命名规范上 例如 BEM 规范 block(块) Element(元素) Modifier(修饰器)
命名方式如下 block__element-modifier 基本上采用BEM表示该元素出现的频率很高
例如下面的一个商品列表
```html
<div class="product">
    <div class="product__header-wrap">
        <div class="product__header"></div>
    </div>
    <div class="product__footer-wrap">
        <div class="product__footer"></div>
    </div>
</div>
```
BEM 需要配合postcss-salad 或者 postcss-bem 使用
无非就是在复杂的容器中如何正确的命名元素 也不是BEM是必须的 但起码这种思想是可以借鉴的
就是命名划分的维度 块 元素 修饰符

### 预处理
传统的css不支持 方法嵌套 以及兼容性的拓展 而预处理就是解决了这一系列问题
如sass 允许在在css 中使用 变量 方法 和嵌套 
如postcss 允许我们配置插件在处理css 例如 autoprefixer插件 用来自动补充需要兼容的浏览器前缀

### 盒模型
盒模型其实是元素框处理元素内容、内边距、边框和外边距的规定方式
容器真实宽度的计算      width(真实) = content-box-width + padding-box-width + border-box-width
content-box 标准盒模型 width(真实) = width(设置的宽度) + padding-box-box + border-box-width
border-box  IE盒模型   width(真实) = width(设置的宽度) 
也就是说 在标准盒模型中 设置的width 其实是 content-box 的width
在 IE盒模型中 设置的width 是 整个盒模型的width

### 盒模型下的背景
css中背景的渲染也提供了不同的计算方式
background-origin 规定了背景开始渲染的位置
background-clip   规定了背景实际显示的位置
background-position 表示从这张背景图片的什么位置 开始渲染在 元素背景上
background-position:X% Y%(百分比值) 表示会把图片 横向X% 纵向的Y% 的点与 元素 横向X% 纵向的Y%点对齐
background-position:Xpx Ypx(数值)  表示图片距离背景起始绘制点的距离 

### FC(Formatting Context)
FC 格式化上下文
BFC 块级格式化上下文  
内部的Box会在垂直方向 一个接一个地放置。
BFC就是页面上的一个隔离的独立容器 容器里面的子元素不会影响到外面的元素 反之也如此 例如 消除margin重叠
计算BFC的高度时 浮动元素也参与计算 例如 清除浮动
BFC的区域不会和 float Box 重合   例如 两列布局
 
IFC 行内格式化上下文 
IFC从包含块水平方向 一个接一个放置 margin padding在水平方向有效
IFC默认对齐方式 vertical-align:baseline 所以同时存在有内容的内联元素和没内容的内联元素 有内容的 会往下掉

GFC 网格布局格式化上下文
display值为grid的元素将会获得一个独立的渲染区域
我们可以通过在网格容器（grid container）上定义网格定义行（grid definition rows）和网格定义列（grid definition columns）属性
在网格项目（grid item）上定义网格行（grid row）和网格列（grid columns）为每一个网格项目（grid item）定义位置和空间 
FFC 自适应格式化上下文
display值为flex或者inline-flex的元素将会生成自适应容器（flex container）
Flex Box 由伸缩容器和伸缩项目组成
通过设置元素的 display 属性为 flex 或 inline-flex 可以得到一个伸缩容器
设置为 flex 的容器被渲染为一个块级元素，而设置为 inline-flex 的容器则渲染为一个行内元素。
[W3C文档BFC](https://www.w3.org/TR/CSS2/visuren.html#block-formatting)
[W3C文档IFC](https://www.w3.org/TR/CSS2/visuren.html#inline-formatting)
[BFC 神奇背后的原理](http://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html)

### 布局之道
布局 简单的可以理解为在文档流下 元素的排版规则
在传统的布局按照文档流正常排布
遇到需要脱离文档流的 一般通过absolute定位或float浮动来解决
为了解决程序员日益增长的精神需要同浏览器传统的布局之间的矛盾
css3中新增了 flex布局和grid布局 FFC和GFC 应运而生 
[flexbox plyground](https://codepen.io/enxaneta/pen/adLPwv)
[flex文档](http://www.css88.com/book/css/properties/flex/index.htm)
[grid布局指南](http://www.css88.com/archives/8510/comment-page-1)
[CSS布局解决方案（终结版）](https://segmentfault.com/a/1190000013565024?utm_source=channel-hottest)

### 移动端布局
移动端的布局跟pc基本一样
主要区别在于 移动端样式中的1px 不等于 屏幕上的1px
[1px!=1px移动端rem布局](https://fenghou.site/2016/12/19/2016-12-19-%E7%A7%BB%E5%8A%A8%E7%AB%AF%E9%80%82%E9%85%8D/)
淘宝rem方案 是将页面划分为10rem 1rem表示的就是页面的1/10  但这对设计稿并不友好
可以自定义一个转换方法 准换为 设计稿的尺寸
```scss

@function remChange($args) {
  @return  $args / 750 * 10rem;
}
```
### 响应式和自适应
简单来说就是能适应不同的尺寸浏览器
常见的做法 根据屏幕宽度的100%来布局 
淘宝的rem方案也是一种解决方案
跟rem方案异曲同工的是通过 可视单位 vw vh解决
vw 相对于视窗的宽度：视窗宽度是100vw
vh 相对于视窗的高度：视窗宽度是100vh
上面的做法严格上来说是自适应的范畴 在不同的终端显示相同

而相应式 通俗的讲 就是大屏我能放下三个div 小点我能放下两个div
一般的做法是通过 css的媒体查询来配置不同尺寸下的样式
```scss
@media screen and (max-width: 1080px){
  //小于1080时代码生效
}
```
### 各种居中的方案
传统布局中图片垂直水平居中
内部需要居中的图片
absolute 定位
top left bottom right 设为0 
margin:auto
浏览器会计算容器的margin
外部容器的宽度 = 内部容器宽度 + 定位left + 定位right + margin-left + margin-right  浏览器会根据这个规则分配

居中对于 Flex Box 和 Grid布局来说有点太儿戏


### 动画
css动画三剑客 
transform 变形
transitions 过渡 
animation 动画

### css中的层叠关系
[css中的层叠规则](http://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)

### 一些注意点和技巧
利用多重背景
叠加规则 是 先写的在上面
```html
<style>
.box{
    width: 100px;
    height: 100px;
    background-image:
    
                linear-gradient(
                        transparent 8%,
                        rgba(0, 0, 0, 0.1) 8%,
                        rgba(0, 0, 0, 0.1) 14%,
                        transparent 14%,
                        transparent 86%,
                        rgba(0, 0, 0, 0.1) 86%,
                        rgba(0, 0, 0, 0.1) 92%,
                        transparent 92%
                ),
    
                linear-gradient(
                        rgba(255, 255, 255, 0.75),
                        rgba(255, 255, 255, 0)
                ),
    
                linear-gradient(
                        45deg,
                        transparent 40%,
                        rgba(0, 0, 0, 0.1) 40%,
                        rgba(0, 0, 0, 0.1) 60%,
                        transparent 60%
                ),
    
                linear-gradient(white, white);
                background-size:
                cover,
                cover,
                4px 4px,
                cover;            
}
</style>


```
<div style="width: 100px;
                        height: 100px;
                        background-image:
                        linear-gradient(
                                            transparent 8%,
                                            rgba(0, 0, 0, 0.1) 8%,
                                            rgba(0, 0, 0, 0.1) 14%,
                                            transparent 14%,
                                            transparent 86%,
                                            rgba(0, 0, 0, 0.1) 86%,
                                            rgba(0, 0, 0, 0.1) 92%,
                                            transparent 92%
                                    ),
                        linear-gradient(
                                            rgba(255, 255, 255, 0.75),
                                            rgba(255, 255, 255, 0)
                                    ),
                        linear-gradient(
                                            45deg,
                                            transparent 40%,
                                            rgba(0, 0, 0, 0.1) 40%,
                                            rgba(0, 0, 0, 0.1) 60%,
                                            transparent 60%
                                    ),
                        linear-gradient(white, white);
                                    background-size:
                                    cover,
                                    cover,
                                    4px 4px,
                                    cover;"></div>
[css背景](http://lea.verou.me/css3patterns/#)

莫名的空白
[line-height和vertical-align](http://www.zhangxinxu.com/wordpress/2015/08/css-deep-understand-vertical-align-and-line-height/)

利用盒模型计算规则制作几何图形
```html
<style>
.box{
    box-sizing: border-box;
    width: 50px;
    border-left:50px solid rgb(255,255,0);
    border-bottom: 25px solid transparent;
    border-top: 25px solid transparent;
}
.box2{
    box-sizing: border-box;
    width: 50px;
    border-left:50px solid rgb(255,255,0);
    border-bottom: 50px solid transparent;
}
</style>
```
<div style="box-sizing: border-box;
                    display:inline-block;
                    width: 50px;
                    border-left:50px solid rgb(255,255,0);
                    border-bottom: 25px solid transparent;
                    border-top: 25px solid transparent;"></div><div style="box-sizing: border-box;
                        display:inline-block;
                        width: 50px;
                        border-left:50px solid rgb(255,255,0);
                        border-bottom: 50px solid transparent;"></div>

文字溢出的省略表示
```scss
//单行
.clamp{
width: 150px;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
}
//多行
.line-clamp{
width: 150px;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
}

```
<p style="width: 150px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;">单行文字溢出单行文字溢出单行文字溢出</p>
<div style="width: 150px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;">
多行文字溢出多行文字溢出多行文字溢出多行文字溢出多行文字溢出
</div>           

负边距
margin-top 设为负值 容器会往上
margin-bottom 设为赋值 容器会从下往上搜索

拓展 俩容器内容不同 保证高度一致

```html
<style>
.wrap{
    overflow: hidden;
}
.box{
    margin-bottom: -10000px;
    padding-bottom: 10000px;
}
</style>
<div class="wrap">
    <div class="box"></div>
    <div class="box"></div>
</div>
```


