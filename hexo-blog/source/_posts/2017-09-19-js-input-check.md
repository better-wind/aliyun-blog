title: 'Js类型'
date: 2017-09-19 10:02:58
tags:
    - js
---
总结一些输入框中类型的判断
<!--more-->

列举几个常用判断为空的情况`以下等于(==)不等于(!=)`

对象       | 不等于         | 等于
----      |     -----      | ----
undefined | '' false 0 []  | null
null      | '' false 0 []  | undefined
''        | null undefined | false 0 []
0         | null undefined | false '' []
false     | null undefined | 0 '' []
[]        | null undefined | false 0 ''

```javascript
var a = undefined || null || '' || 0 || false
if(!a){
  console.log('会执行')
}

var b = a || 'test'
console.log(b) // test
//判断是否输入了
//转成string 一来replace可以调用 而来 如果数据是一开始写入的0
var _s = (inputVal+'').replace(/(^\s*)|(\s*$)/g,'')
if(_s){
    //输入有效
}
```

