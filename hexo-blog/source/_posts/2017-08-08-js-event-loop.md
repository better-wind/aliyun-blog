title: 'eventLoop'
date: 2017-08-08 16:28:27
tags:
    - js
---
记录事件循环机制
<!--more-->

### alert引起的争论
```javascript
var count = 0
var inter = setInterval(function(){
    if(count == 100){
        document.querySelector('#process').innerText = count+'%'
        console.log(count)
        alert('加载完成')
        clearInterval(inter)
    }
},100)
//弹框时 页面上process显示的是什么？ 输出的count是什么？
```
要解决这个问题要理解js的事件循环机制是怎么实现的
### 单线程 && 任务队列 && eventLoop
首先Js是单线程的 
主线程运行的时候，产生堆(heap)和栈(stack)
Js执行过程中将执行函数推入 执行栈中 执行结束后 弹出执行
当碰到js执行外部的API时会 js会将它当做任务源来处理 他返回的是一个待执行的任务
当这个任务满足执行条件时 js会将它推进一个 任务队列当中
当执行栈 为空时 js会去调取任务队列中任务 推入 执行栈中执行 这个过程就是 eventLoop
任务队列 分为 宏任务队列(macro-task)(task) 微任务队列(micro-task)(jobs)
当执行栈为空时 先回执行 微任务 然后再执行 宏任务

> 触发任务的API
DOM(DOCUMENT),AJAX,setTimeOut,setInterval,Promise,process.nextTick,setImmediate
其中 加入宏队列中任务 DOM(DOCUMENT),AJAX,setTimeOut,setInterval,setImmediate
加入微任务队列中的任务 Promise,process.nextTick

### 真相
>![eventLoop](/assets/blogImg/2017-08-08-js-event-loop.png)
图片来自Philip Roberts的演讲《Help, I'm stuck in an event-loop》

所以 上面的js在执行中
遇到 `document.querySelector('#process').innerText = count+'%'` 
推入执行栈 由于是DOM操作判定为任务源 推出执行栈
加入到 宏任务队列
遇到 `console.log(count)`
推入执行栈 控制台输出 100 推出执行栈
遇到 `alert('加载完成')`
推入执行栈 弹窗确认后 推出执行栈
遇到 `clearInterval(inter)`
推入执行栈 执行 推出执行栈
此时执行栈为空 开始调用 任务队列
微任务队列为空 直接调用宏任务队列
将 `document.querySelector('#process').innerText = count+'%'` dom操作推入执行栈
渲染页面 推出执行栈

这里有个问题就是 碰到这个外部API时 并不是把 这些外部API推入任务队列
在执行栈中 这些API还是立即执行的 它分发的任务 才是延迟执行
```javascript
//譬如
setTimeout(function(){
    console.log('log')
},1000)
//setTimeOut 会立即进入执行栈 并且执行
//它的第一个参数就是他要分发的任务 会在满足它的分发条件后进入任务队列 
// 上例就是1000ms后进入任务队列
```
再看下面的两个例子
```javascript
//demo 1
setTimeout(function A() {
    setTimeout(function B(){console.log(8);},0);
    console.log(5);
    Promise.resolve().then(()=>{
        console.log(7);
    })
    console.log(6)
},0);
console.log(1)
new Promise(function(reslove){
     console.log(2);
     reslove()
}).then(()=>{
     console.log(4)
})
console.log(3)

//demo 2
function A(x){
   setTimeout(function(){
       console.log(2.2+x)
   },0)
   Promise.resolve().then(()=>{
       console.log(2.1+x);
   })
   console.log(1+x)
}
function B(){
    A('B')
}
A('A')
B() 
 ```
联系上面的分析 
第一题的输出 应该是 1 2 3 4 5 6 7 8

第二题的输出 应该是 1A 1B 2.1A 2.1B 2.2A 2.2B
 
写在一块输出 应该是 1 2 1A 1B 3 4 2.1A 2.1B 5 6 7 2.2A 2.2B 8

> 参考文章
[js的单线程和异步](http://www.cnblogs.com/woodyblog/p/6061671.html)
[JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
[前端基础进阶（十二）：深入核心，详解事件循环机制](http://www.jianshu.com/p/12b9f73c5a4f)

