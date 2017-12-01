title: 'node-webpack'
date: 2017-11-16 11:29:13
tags:
    - webpack
    - node
---
webpack - 笔记
<!--more-->
### CSS样式表
webpack可以做的
预处理语言转换 (scss-loader等)
提取样式表文件 (extract-text-webpack-plugin)
补全浏览器前缀 (postcss-loader autoprefixer)
打包压缩

webpack 加载器的加载规则
```javascript
model:{
   rules:[
    {
       test:'',
       use:[
        {
          loader:'',
          options:{}  
        },
        {}
       ]
    }
   ]
}
```
可以考虑 将 css-loader 相关的加载处理抽出来处理
webpack 说到底就是一份配置文件
完全可以自由的拼拆(webpack-merge)

> extract-text-webpack-plugin
抽取样式 请配合 plugins使用 
抽取样式 请配合 plugins使用 
抽取样式 请配合 plugins使用 三遍
new ExtractTextPlugin('style.css')


### babel
关于es6 babel的转换
transform-runtime 转换语法 ES6 的语法转换成ES5的
通俗理解为 转换语法糖
不转换新增API Map Set。。。includes等
如果需要实现 则需要通过引入 babel-polyfill来实现
```javascript
const a = [1,2,3]
a.push('5')
console.log(a.includes('5'))

// 如上代码 会转换成

var a = [1, 2, 3];
a.push('5');
console.log(a.includes('5'));
```
### 公共模块抽离
webpack抽离公共的模块
> name 打包的名称
  minChunks: number|Infinity|function(module, count) -> boolean,
  // 在传入  公共chunk(commons chunk) 之前所需要包含的最少数量的 chunks 。
  // 数量必须大于等于2，或者少于等于 chunks的数量
  // 传入 `Infinity` 会马上生成 公共chunk，但里面没有模块。
  // 你可以传入一个 `function` ，以添加定制的逻辑（默认是 chunk 的数量）
      并且调用函数时会传入 module 和 count 参数。
      module 参数代表每个 chunks 里的模块，这些 chunks 是你通过 name/names 参数传入的
      module.context: The directory that stores the file. For example: '/my_project/node_modules/example-dependency'
      module.resource: The name of the file being processed. For example: '/my_project/node_modules/example-dependency/index.js'
      count 参数表示 module 被使用的 chunk 数量
      
      
可以通过传参minChunks来控制你希望重复出现几次的module 被提取出来打包。
也就是说你自己可以控制当一个模块被引入几次可以被打包到共用的chunk中，
还可以规定如果这个公共模块小于一个值 minSize，
就不被提取出来这些都可以帮助你控制你想要的粒度。
当你改的不是公共模块的代码，理论上webpack 打包的时候本来就不会影响其他代码。
但是webpack 在使用 CommoChunkPlugin会生成一段 runtime 代码，
而哪怕你不改变common 里的代码这个 runtime 仍然是会跟随着打包变化的并且打入你的common 中，
所以你的common 的hash 就会开始变化了。
但是也有办法，就是独立把生成的runtime 代码抽出来。
（manifest）像下面一样，这个是从 vue-cli 中学习而来
      
      
      
```javascript
new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
        )
      }
    })
 new webpack.optimize.CommonsChunkPlugin({
       name: 'mainfest',
       chunks: ['vendor']
     })   
    
```


### 模块异步加载
第一个参数 依赖的文件 第二个参数回调 第三个参数 命名名称
```javascript
output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
  }


require.ensure([], require => {
        require('../Component/Index')
    },'Index')
// 传入第三个参数的  js/Index.xxxxxxxx.js
// 不传的           js/id.xxxxxxxx.js
// 第三个参数相同的会打包到一个js 中      
```
Vue中路由实现 
```javascript
Home = resolve => require.ensure([],()=>{resolve(require('@/components/common/Home'))})
Home = resolve => require.ensure([],()=>{resolve(require('@/components/common/Home')),'Home'})
Home = resolve => require(['@/components/common/Home'], resolve)
```
react中路由实现
```javascript
const Home = (location, resolve) => {
    require.ensure([], require => {
        resolve(null, require('../Component/Home').default)
    })
}
const Home = (location, resolve) => {
    require.ensure([], require => {
        resolve(null, require('../Component/Home').default)
    },'Home')
}
```
普通js实现
```javascript
load = ()=>{
    require.ensure([], require => {
              require('@/assets/js/demo')
             })
}
load()

//demo.js         
console.log('I load')
function V(){
  console.log('I will V')
}
V()         
```






