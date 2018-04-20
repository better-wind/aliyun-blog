title: '一颗关于省市区的树'
date: 2018-04-20 14:17:54
tags:
    - vue
    - js
---
如何绘制一个省市区三级可选择的树？
<!--more-->


### 开始
总结一下 开发过程中的思路想法 各位大佬们看看就好

首先你拥有的数据结构 所有省市区的信息列表 以及已经选中的信息
用的是element-ui的 el-tree
```javascript
const cityStorage = {
    provinceList:[
        {id: 1, provinceId: "110000", name: "北京市"}
    ],//所有省
    cityList:[
        {id: 1, cityId: "110100", name: "北京市", provinceId: "110000", zipCode: "102600"}
    ],//所有市
    districtList:[
        {id: 1, districtId: "110101", name: "东城区", cityId: "110100"}
    ],//所有区
    }
const selectList = [
    { provinceId: "110000",cityId: "110100",districtId: "110101"}
] // 所有选中的省市区 ID 保存的时候也是这个格式
```

### 按需渲染
首先 作为有相对要求的开发人员 不会考虑说 直接的去渲染出整个树 那整个省市区加载的速度绝对会是感人的

那么 可行的解决方法是 一开始 只展示 所有省的信息 点击展开 时再去渲染下一层 数据

这个对应关系 相对还容易找 每次点击展开能获得当前的层级和id 根据层级和id去对应的city和district中过滤就行

这里分享一个小技巧 不通过判断的方式去对应 而是通过数据的方式
```javascript
//level , id
const levelConfig = {
     1: {
        idLabel: 'cityId',
        fetchLabel: 'cityList',
        perIdLabel: 'provinceId'
     },
     2: {
        idLabel: 'districtId',
        fetchLabel: 'districtList',
        perIdLabel: 'cityId'
     }
}

// 那么过滤就可以这么写
cityStorage[levelConfig[level].fetchLabel].filter(item => item[levelConfig[level].perIdLabel] == id)
```
获取数据 然后加载对应下一层 一切到现在为止 都还可以
![new-tree](/assets/blogImg/tree/new-tree.png)


### 赋值渲染
再往下 如果我有初始数据呢？

在只展示省信息的情况下 结合前面给的数据格式 怎么展示 这个省是 全选 半选(表示省中有选择的市或者区但没选全) 和 不选 ？

第一 你需要设法知道省份满足全选的条件
第二 你需要设法知道已经选择的情况

所以这个时候 需要做的 是计数 也就 ++
遍历一遍 cityStorage.provinceList 和 cityStorage.cityList
往Map中初始化 provinceId cityId 对应的计数
在遍历 cityStorage.districtList 过程中往Map 对应provinceId cityId 增加计数

那么 有没有什么别的基础数据 是要在这个时候初始化的呢？
例如 只给你一个 districtId 你怎么才能最快的 找到他对应的 cityId 和 provinceId
或者 只给你一个 id 怎么最快找到他 对应的 name 呢
Map
我们可以构建一个Map来记录我们需要的信息
districtId:cityId
cityId:provinceId
那么 我可以通过 Map[districtId] 找到cityId Map[Map[districtId]] 找到 provinceId
id 和 name 的对应关系 也是如此
而这些 可以在 计数的 过程进行

接着 通过已经选择地区 的 列表 获取provinceId cityId的数据 的计数

两份数据都有了 

在渲染 省的时候 判断 两份Map中对应的计数 是否相同来渲染勾选

那半选的状态怎么表示呢？el-tree并不支持设置半选的状态，必须是通过数据的形式呢？
![edit-tree](/assets/blogImg/tree/edit-tree.png)

通过模拟子节点的方法 当满足不全选的情况 模拟两个子节点
```javascript
var children = [
    {
      id:provinceId+'111',
      label:name,
      type:'none'
    },
    {
      id:provinceId+'222',
      label:name,
      type:'none'
    }
]
```
然后选中 其中一个 父元素自然就是半选状态

### 保存提交
最后是保存提交时候的数据处理

由于模拟了半选状态 所以最后获取到的选中的数据 会有两种

一种常规的6位 还是一种是模拟的d{6}xxx

而且如果 是出现这种d{6}xxx的数据 代表的是它所在的一级有些被选中了 而这些数据还没有出现在 渲染树中

这是就 需要有一个数据结构记录 这种情况

在已选择的数据 初始化计数的时候 新构建一个Map 存储 provinceId cityId出现的数据的下标(我这边保存的是districtId)
provinceId:[districtId,districtId,districtId]
cityId:[districtId,districtId,districtId]
至此 我们最后能拿到的 选中的 id 有 [310000,410000111,510100,610101]
此时这份数据中 有provinceId cityId districtId 以及 模拟的半选数据 怎么尽可能的优雅的生成我们需要的格式呢？

首先是分类 可以发现 xx0000表示的是省  xxx000 xxxx00 表示的是市
```javascript
let _zeo = item.match(/(0+)$/g),
           type = _zeo ? _zeo[0] : '0'
          switch (type) {
            case '0':
              districtList.push(item)
              break;
            case '00':
            case '000':
              cityList.push(item)
              break;
            case '0000':
              provinceList.push(item)
              break;
          }
```
而这种410000111 数据 可以通过 先前的 Map 将数据并入 districtList 中

接着就是净化数据

省选择了 不需要市的所有id 市选择了 不需要区的所有id

总结 判断条件
```javascript
var sub = item.substr(0,2)
var re =new RegExp('\^' +sub+'\\d{4}'); // 省
// var sub = item.substr(0,4)
// var re =new RegExp('\^' +sub+'\\d{2}'); // 市
cityList.filter(code=>!code.match(re))
```
最后 provinceList cityList districtList 都是有效的选中值
遍历一遍 cityStorage.districtList 将其中在provinceList cityList中存在id的数据并入 districtList中

此时 districtList 是最终有效的所有选中的 districtId值
此时 cityId = Map[districtId] province=Map[cityId]

写这个需求的时候 头真的很大 一开始的思路绝对没有这么清晰 
考虑的再清楚 写着写着 还是会有让人抓狂的问题

### 展示归并
等等 你以为就这么完了 还有一个展示需求 数据结构还是 保存的那份数据结构
希望展示成
当选择了一个省份全部地区的时候展示省份名称
当选择了一个省份下的部分市时展示市的名称
当选择了一个市下的所有地区时,只展示市的名称
当选择了一个市下的部分地区时,括号内展示地区名称
![edit-tree](/assets/blogImg/tree/name.png)

首先还是通过计数 获取 已经选中的有效的 provinceList cityList districtList
数据格式{provinceId: "110000",cityId: "110100",districtId: "110101"}

构建一个存 selectNameList 用于存放已经选中的 name name可以通过前面的Map[id]获取

provinceList 选择的省没问题 直接推入

cityList 遍历 构建新的数据 格式 {provinceId: "110000",cityId: "110100",districtId: "1"}
并入 districtList 中

对districtList 根据 cityId 排序

最后 遍历 districtList 通过标记判断每次是否是重复的cityId  设置数组 indeterminateNameList 记录不是全选的市的name
不重复 将标记记为当前cityId 如果上一个元素的 districtCode 是 1 将 indeterminateNameList 存入 selectNameList 中 
selectNameList.push('(<span class="c-dis">' + indeterminateNameList.join('，') + '</span>)')
districtId == 1 全选 存入 selectNameList
districtId != 1 不是全选 存入 indeterminateNameList = [cityId]
在这个过程中 有需要 还可以记录 cityId 和 indeterminateNameList的管理关系

最终 selectNameList.join('，') 






















