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
//现在我想给label='me'的cates 复制怎么做
//假如我知道他的结构层级是[0,0,0]
cates[0].cates[0].cates[0].cates = []
let _item = [0,0,0]
let _arr = []
_item.map((item)=>{
    _arr = cates[item]
})
let arr = cates[0].cates[0].cates[0].cates

```

