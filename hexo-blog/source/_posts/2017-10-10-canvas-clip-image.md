title: 'canvas 图片裁剪'
date: 2017-10-10 16:50:07
tags:
    - canvas
---
心血来潮想实现一个图片编辑器
<!--more-->

### 需求
实现图片根据选择区域裁剪
选择区域大小可以拖动改变

### 实现思路
> 裁切drawImage(image,x,y,w,h,_x,_y,_w,_h)

x 裁切图片中x坐标
y 裁切图片中y坐标
w 裁切图片中的宽
h 裁切图片中的高
_x canvas中显示的x坐标
_y canvas中显示的y坐标
_w canvas中显示的宽
_h canvas中显示的高

所以思路是 在图片上显示一个选择区域 可以拖动 获取相对于图片的位置 在canvas中加载图片

> 拉伸大小

宽度拉伸 可以通过在选择区域中绝对定位一个元素来模拟边框 监听它上面的move事件来处理
这里注意事件的执行机制
事件的执行机制分为冒泡型和捕获型
冒泡型事件 从当前节点开始执行 一路传递给绑定当前事件的父元素 知道根节点为止
捕获型事件 从最外层绑定该事件的元素往子元素传递
addEventListener第三个参数默认false true表示冒泡事件 false表示捕获事件
可以通过
event.stopPropagation()
来阻止事件的冒泡
event.preventDefault()
这个是用来阻止事件的默认操作


> 旋转

通过控制Img旋转来控制
一开始的想法是通过旋转选择区域来选取，但这样选择区域的获取图片数据会很繁琐而且意义不大
旋转通过样式transform:rotate(0deg)
在js获取样式时 要通过getComputedStyle这个API来获取
style获取的是元素style属性中的样式 可读可写
所以通过style设置的元素回出现在元素的style属性中
getComputedStyle 获取的是最终作用在节点上的样式 只读
currentStyle IE自娱自乐产物 语法跟style类似 功能跟 getComputedStyle类似

```javascript
var clipV = window.getComputedStyle(clip,null)
var clipTrans = clip.getPropertyValue('transform')
// or var clipTrans = clip.transform
// 这时候获取的是一个二维矩阵
// 型如 matrix(20, 10, 10, 10, 0, 0)
```

> 关于matrix

matrix(a,b,c,d,e,f)
e,f 控制 x, y轴的偏移位置

a,b,c,d 控制旋转 旋转的角度(θ) matrix(cosθ,sinθ,-sinθ,cosθ,0,0)

角度计算 angle = Math.round(Math.atan2(b, a) * (180 / Math.PI))
缩放计算
`有旋转时`
x轴缩放  scaleX = Math.sqrt(a * a + b * b)
y轴缩放  scaleY = Math.sqrt(c * c + d * d)
`无旋转时`
x轴缩放  scaleX = a
y轴缩放  scaleY = b

matrix(1,tan(θy),tan(θx),1,0,0)
拉伸计算
x轴拉伸角度 skewX = Math.atan(c)
y轴拉伸角度 skewX = Math.atan(b)




>css动画界三巨头 transform transitions animation
举个例子
王者农药 新出一个英雄 `浪`
`一技能(transition)` 标记敌人 设置过度效果
`二技能(transform)` 命中敌人 变化敌人
`三技能(animation)` 命中目标 设置过度效果 变化敌人并带有过度效果(只产生效果)
`被动(style.)`   二技能命中标记一技能的目标 会使二技能有过度效果；普攻第三次 变化敌人

>硝烟弥漫的峡谷中 刚刚结束一场战斗 我方四名英雄死于敌方小兵之手
这时。。。
我方`浪`出现在中路 对线敌方诸葛亮 李白 红蓝双buff在手
一技能 成功标记诸葛亮(李白逃脱)  transition:transform 100ms linear
反手 一个二技能  transform:translate(0px,100px)(移动到我方中路一塔下) 命中对方诸葛亮 和 李白
李白唰一下出现在我方塔下(效果如闪现) 诸葛亮也慢跑到塔下...
`浪` double kill
对面鲁班 苏烈过来支援 反手一个 大招  animation:scale_leg(腿缩短至十分之一) 100ms 4  alternate linear
只见 鲁班 苏烈一会变高 一会变矮 ...
`浪` quadra kill
木兰从草丛杀出 一技能 怼脸上  transition:display 100ms linear 蓝条空了
普攻 普攻 丝血 闪现接普攻 触发被动
缓缓的消失吧，木兰！！ document.querySelector('花木兰').style.display = 'none'
`浪` penta kill


### 总结
css相关的还是要经常温故温故 不然真的容易忘了

