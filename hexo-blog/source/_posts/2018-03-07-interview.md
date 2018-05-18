title: Knowledge
date: 2018-03-07 17:22:43
tags:
    - js
    - canvas
---
Canvas && Js
<!--more-->
## Canvas
颜色提取
毛笔字
连线小球
烟花
星空

## Js

### 规范
命名规范
命名
规范检查
eslint

### API
ES5/ES6/ES7
[30-seconds-of-code](https://github.com/Chalarangelo/30-seconds-of-code)

### 类型
类型 
存储
对象

### 正则
元字符
限定符
test exec match
replace
### 事件模型
事件冒泡 从点击外外    false
事件捕获 从点击外往里  true
事件委托

### 作用域和上下文
函数作用域
作用域链
执行环境
执行上下文

### 事件机制
eventLoop


### 闭包
函数私有化
柯里化
IIFE

### 原型
原型
原型链
### 继承
继承方式
### this
apply call bind 剪头函数
### 模块化
commonJS
import

### 异步
Promise
Generator
async await
图片预览
```javascript
getFileImage:(src)=>{
    return new Promise((resolve,reject) => {
      var image = new Image();
      image.onload = function(){
        const width = image.width
        const height = image.height
        resolve({width,height})
      }
      image.onerror = function(err){
        reject(err)
      }
      image.src = src;
    })
  },
  getFileReaderImage:(file)=>{
    return new Promise((resolve,reject)=> {
      var fr = new FileReader();
      fr.onload = async function(_file) {
        try{
          const imageWh =  await UtilTool.getFileImage(_file.target.result)
          const size = file.size
          const type = file.type
          resolve({...imageWh,size,type})
        } catch (err) {
          reject(err)
        }


        // var image = new Image();
        // image.onload = function(){
        //   const width = image.width
        //   const height = image.height
        //   const size = file.size
        //   const type = file.type
        //   resolve({width,height,size,type})
        // }
        // image.onerror = function(err){
        //   reject(err)
        // }
        // image.src = _file.target.result;

      }
      fr.onerror = function(err){
        reject(err)
      }
      fr.readAsDataURL(file);
    })
  }
```





