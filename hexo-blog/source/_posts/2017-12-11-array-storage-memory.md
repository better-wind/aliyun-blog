title: '巧用数组存储'
date: 2017-12-11 09:43:41
tags:
    - js
    - vue
---
多重数组赋值
<!--more-->
```javascript
var cates = [
    {
      label:'',
      value:'',
      cates:[
        {
          label:'',
          value:'',
          cates:[
           {
              label:'me',
              value:'',
              cates:[]
           }
          ]
        }
      ]  
    }
 ]
//现在我想给label='me'的cates 赋值怎么做
//假如我知道他的结构层级是[0,0,0]
//you can 
cates[0].cates[0].cates[0].cates = [1,2,3,4]
// other way
let _item = [0,0,0]
let _arr = []
_item.map((item)=>{
    _arr = cates[item]
})
_arr = [1,2,3,4]
//此时 _arr 和 cates[0].cates[0].cates[0].cates 指向 相同 存储空间

```

