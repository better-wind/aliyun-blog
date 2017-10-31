title: '从源码看webpack'
date: 2017-10-25 10:21:01
tags:
    - webpack
---
研究研究 源码
总结总结 心得
<!--more-->
### 配置
webpack 这边的配置
主要还是根据项目来灵活的配置
大的项目根据运行环境来区分 开发 测试 线上
本地的调试通过node来搭建
小的项目可以通过命令行的形式直接敲命令

>devServer

devServer可以用来配置热加载 请求代理 静态资源访问等
```javascript
// 可以配置在webpack配置对象里的devServer里面
devServer: {
        hot:true,
        contentBase:path.resolve(__dirname,'../'),
        publicPath:path.resolve(__dirname,'../assets/')
    }
// 或者在调用的时候传入
var server = new WebpackDevServer(compiler,devServer)
```
通过 `webpack-dev-server`的源码可以看到
热加载是通过 `sockjs`来实现的

```javascript
//实现原理 server.js
var sockjs_opts = {sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"};
var sockjs = sockjs.createServer(sockjs_opts);
sockjs.on('connection', function(conn) {
    conn.on('data', function(message) {
        conn.write(message); // 向客户端 发送
    })
});
var app = express(); 
var server = http.createServer(app);
sockjs.installHandlers(server, {prefix:'/demo'});
// client.js
var sockjs_url = '/demo';
var sockjs = new SockJS(sockjs_url);
sockjs.onmessage = function(e) {
    // e.data
    window.location.reload()
};
    
```
这也是为什么 要在 entry中将 `webpack-dev-server/client?http://localhost:8080/`引进来的原因
 
devServer的proxy是依赖`http-proxy-middleware`实现

而 devServer中的publicPath指定的是根据 dev-server服务请求中的静态资源的目录

>devtool

source-map 几种模式 主要还是解决 多模块文件的调试和明确报错提示


### 命令行
webpack 的启动可以通过命令行调用
> `webpack --w --config --progress --color`

通过这个命令可以启动webpack 监听 配置文件config路径 以及进程和颜色
具体的实现过程 输入命令行后会 执行 `node_modules/.bin/webpack` 这个脚本
然后会启动 `node_modules/webpack/bin/webpack.js`
通过 yargs 这个node插件可以获取 在命令行中输入的参数

```javascript
//config-yargs.js
module.exports = function(yargs) {
    yargs
        .help("help")
    	.alias("help", "h")
    	.version()
    	.alias("version", "v")
    	.options({
            "watch": {
            	type: "boolean",
            	alias: "w",
            	describe: "Watch the filesystem for changes",
            	group: BASIC_GROUP
            },
            ...
    	})
}

//webpack.js
var options = require("./convert-argv")(yargs, argv);
//通过convert-argv.js 进行加工 返回一个混合配置文件的最终 options
processOptions(options);
function processOptions(options){
    var webpack = require("../lib/webpack.js");
    var compiler = webpack(options);
    if(options.watch) {
    	compiler.watch(watchOptions, compilerCallback);
    } else
    	compiler.run(compilerCallback);
}
```


### node
通过vue-cli构建的vue项目 开发是依赖 webpack
他是通过自己启动服务 将webpack作为中间件来运行
然后通过各种插件实现 代理 热加载等功能
通过express 来实现热加载 是依赖 `webpack-hot-middleware`实现
通过webpack构建的实例是继承`tapable`的
`tapable` 用于事件发布执行的插件
通过 `plugin`注册事件
通过`applyPlugin`等响应事件

```javascript
var webpackConfig = require('./webpack.config')
var compiler = webpack(webpackConfig)
var hotMiddleware = require('webpack-hot-middleware')(compiler,{
    log:()=>{}
})
//通过 html-webpack-plugin-after-emit 来触发 行为
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        console.log('------------')
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

//client
require('eventsource-polyfill')
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')
// 响应 刷新页面
hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})

```

通过webpack的源码可以看到 webpack启动时 根据watch参数和回调来判断是否开启监听
```javascript


var mergeConfig = merge(webpackConfig,{
    watch:true
})
webpack(mergeConfig)  //监听
webpack(mergeConfig,function(){}) //监听
// 没有 回调 没有watch 执行watch
compiler = webpack(mergeConfig)
compiler.watch()
```

### 原理
可以看到`webpack`的流程都是基于`tapable`订阅和发布机制来实现
而`tapable`的设计思想 是面向切面的编程设计aop
```javascript
//例子 统计A方法的调用次数
// 直接写在A方法里 耦合了A的业务逻辑
// 通过回调参数解决 增加后期维护难度
function A(){
  console.log('执行A的逻辑')   
}
function B(){
  console.log('执行B的逻辑')  
}

//AOP
Function.prototype.logCount = function(fn){
    var _self = this
     return function(){
        fn.apply(this,arguments)
        return _self.apply(this,arguments)
     }
}
var A_log = A.logCount(B)
A_log()
// 业务解耦 面向切面进行拓展

`tapable`就是一句这种思想进行设计
function ComP(){
    this._plugins = {}
}
ComP.prototype.plugin = function(){}
ComP.prototype.applyPlugins = function(){}

//webpack 的plugins 提供一个 apply 方法作为插件的入口
//并在这个方法中 发布时间
//在webpack构建时 调用apply方法
function WebP(options){
    var compiler = new ComP();
    compiler.apply.apply(compiler,options.plugins)
    compiler.run();
}
// options.plugins 是个数组 这里使用apply的技巧 第二个参数接受数组 在调用的方法里转成列表
ComP.prototype.apply = function(){
    for(var i = 0; i < arguments.length; i++) {
            arguments[i].apply(this);
        }
}
function plugDemo(){

}
//plugDemo 订阅emit事件 当webpack的构建流程到emit时执行
plugDemo.prototype.apply = function(compiler){
    compiler.plugin("emit", (callback) => {
        setTimeout(function(){
            console.log('第一次执行')
            callback()
        },1500)

    });
}
var _obj = {
    plugins:[
        new plugDemo()
    ],
}
WebP(_obj)
```




