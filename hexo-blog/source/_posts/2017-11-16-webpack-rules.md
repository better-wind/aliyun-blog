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
       test:'', //多个loader建议配置
       use:[
        {
          loader:'',
          options:{}  
        },
        {}
       ]
    },
    {
       test:'',//单个loader建议配置
       loader:'',
       options:{}
    }
   ]
}
```
对于要抽离出来的css文件的配置
```javascript
var ExtractTextPlugin = require('extract-text-webpack-plugin')
rules:[
    {
            test:/\.css$/,
            use: ExtractTextPlugin.extract('css-loader','style-loader')
    },
    {
           test:/\.css$/,
           use: ExtractTextPlugin.extract({
               use:[
                   {
                       loader:'css-loader',
                       options:{
                          sourceMap:true
                       }
                   }
               ]
           })
    },
    
]
```
使用postcss-loader时需要配置 .postcssrc.js 
安装 autoprefixer 并且指定兼容(package.json中配置) 
```javascript
//.postcssrc.js
module.exports = {
  "plugins": {
    // to edit target browsers: use "browserlist" field in package.json
    "autoprefixer": {}
  }
}
//package.json
"browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
/*
last 2 versions: the last 2 versions for each browser.
最后2个版本：每个浏览器的最后2个版本。

last 2 Chrome versions: the last 2 versions of Chrome browser.
最后2个chrome版本：chrome浏览器的最后2个版本。

> 5%: versions selected by global usage statistics. >=, < and <= work too.
> 5％：由全局使用统计选择的版本。> =，<和<=也工作。

> 5% in US: uses USA usage statistics. It accepts two-letter country code.
> 5% in US: 使用美国使用统计。它接受两个字母的国家代码。

> 5% in alt-AS: uses Asia region usage statistics. List of all region codes can be found at caniuse-lite/data/regions.
> 5% in alt-AS: 使用亚洲地区使用情况统计。所有地区代码清单可在caniuse-lite / data / regions中找到。

> 5% in my stats: uses custom usage data.
> 5% in my stats: 使用自定义使用数据

extends browserslist-config-mycompany: take queries from browserslist-config-mycompany npm package.
扩展browserslist-config-mycompany: 从browserslist-config-mycompany npm包中获取查询。

ie 6-8: selects an inclusive range of versions.
ie 6-8: 选择包含范围的版本

Firefox > 20: versions of Firefox newer than 20. >=, < and <= work too.
Firefox > 20: Firefox的版本比20更新。> =，<和<=也可以。

iOS 7: the iOS browser version 7 directly.
iOS 7: 直接使用ios浏览器版本7

Firefox ESR: the latest [Firefox ESR] version.
Firefox esr：最新的[firefox esr]版本。

unreleased versions or unreleased Chrome versions: alpha and beta versions.
未发布的版本或未发布的Chrome版本：alpha和beta版本。

last 2 major versions or last 2 iOS major versions: all minor/patch releases of last 2 major versions.
最后2个主要版本或最后2个主要版本: 最后2个主要版本的所有次要/补丁版本  

since 2015 or last 2 years: all versions released since year 2015 (also since 2015-03 and since 2015-03-10).
自2015年或最近2年以来: 自2015年以来发布的所有版本（自2015-03和2015-03-10以来）   

dead: browsers from last 2 version query, but with less than 0.5% in global usage statistics and without official support or updates for 24 months. Right now it is IE 10, IE_Mob 10, BlackBerry 10, and BlackBerry 7.
dead: 来自上次2版本查询的浏览器，但全球使用情况统计信息少于0.5％，并且24个月没有官方支持或更新

defaults: Browserslist’s default browsers (> 0.5%, last 2 versions, Firefox ESR, not dead). 
defaults://默认配置

not ie <= 8: exclude browsers selected by previous queries. 
not ie <= 8: 排除先前查询选择的浏览器 
*/  


```
使用 optimize-css-assets-webpack-plugin 插件压缩css
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

### devServer
关于webpack的devServer
如下配置
```javascript
devServer:{
        contentBase:path.resolve(__dirname,'../static'),
        publicPath:'/',
        port:8888,
        open:true,
        host:'192.168.0.246',
        hot:true,
    }
/*
* Project is running at http://192.168.0.246:8888/
* webpack output is served from /
* Content not from webpack is served from E:\github\firework\static
* */
```
contentBase 指定的是 页面中引用的不是通过webpack打包的文件的 获取目录
publicPath  指定的是 页面中引用的是通过webpack打包的文件的获取目录

hot 指的是是否开启热重载 
需要搭配 new webpack.HotModuleReplacementPlugin() 插件一起使用








