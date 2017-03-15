title: 'ECMA-prototype'
date: 2016-12-28 19:09:23
tags:
    - js
---
要学好Js，首先必须得先理解原型(prototype)
why？
js作为面向对象的语言，实现面向对象的机制就是原型！
<!--more-->
都说js中一切皆对象,那到底什么是对象呢？

> 对象是属性的集合，并有一个原型对象。原型对象可以是空值。
  按宿主环境分可以分为
  原生对象：由ECMAScript规范定义其语义的对象
  内置对象：由ECMAScript实现提供，独立于宿主环境的对象，ECMAScript程序开始执行时就存在(所有内置对象是原生对象)
  宿主对象：由宿主环境提供的对象，用于完善ECMAScript执行环境(DOM,BOM)
  按功能分可以分为：
  普通对象：无原型对象
  函数对象：有原型对象(函数对象的一个实例)

我们这里只关注函数对象
那么到底什么是原型呢？

```javascript
//凡是通过new Function() 创建的对象都是函数对象
function Bar(){}
var foo = function(){}
var baz = new Function();
//Bar foo baz 都是函数对象
//原型对象本质是函数对象的一个实例
function Bar(){
}
Bar.prototype
var temp = new Bar();
Bar.prototype = temp;
var temp = new Function();
Function.prototype = temp
//构造器：创建和初始化对象的函数对象(在原型对象prototype中,prototype.constructor)
//原型对象prototype中都有个预定义的constructor属性，用来引用它的函数对象
//每个由构造器创建的对象拥有一个执行构造器prototype的属性值的隐式引用
//这个引用称之为原型
//每个原型可以拥有指向自己原型的隐式引用(原型的原型),就是所谓的原型链
//每个对象都有一个__proto__属性来实现对原型的隐式引用
function Person(){}
Person.prototype = {
    name:'Louis',
    age:'24'
}
var person = new Person();
person.__proto__ = Person.prototype
Person.prototype.__proto__ = Object.prototype
Object.prototype.__proto__ = null
//person对象由构造器Person创建
//所以person对Person.prototype有隐式引用(__proto__)
//Person对象又是由构造器Object创建
//所以Person对Object.prototype有隐式引用(__proto__)
```
![原型](/assets/blogImg/prototype.png)