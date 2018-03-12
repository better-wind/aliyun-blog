title: Knowledge
date: 2018-03-06 10:45:29
tags:
    - 浏览器
---
通信 && 浏览器
<!--more-->
## 通信
### Http
http协议
客户端请求 服务端响应 单次链接
无状态 对处理的事务没有记忆
request headers
content-type 请求传输的MIME类型
常用的
application/json json数据格式 {username:"name",password:"pwd"}
application/x-www-from-urlencoded 经过编码的键值对请求字符串 username=name&password=pwd
注意点：这边转换的时候需要进行encodeURIComponent转码处理

response headers
content-type 返回资源的MIME类型
text/html
image/jpeg
application/javascript
text/css
application/json

请求类
POST
GET
[听说『99% 的人都理解错了 HTTP 中 GET 与 POST 的区别』？？](https://zhuanlan.zhihu.com/p/25028045)
[HTTP｜GET 和 POST 区别？网上多数答案都是错的！](https://juejin.im/entry/597ca6caf265da3e301e64db)
[rfc文档](http://man.chinaunix.net/develop/rfc/default.htm)
[HTTP权威指南pdf 密码 7p7m](https://pan.baidu.com/s/1Or3_1gxChZi6SDffHpGqZQ)
### Https
Http协议的安全版本
在TCP协议删加了一层SSL协议
网络七层协议
### TCP
TCP协议连接时三次握手
TCP协议断开时四次握手


### Ajax
Asynchronous Javascript And XML 异步JavaScript和XML
XMLHttpRequest
API
事件
状态

### websocket
双工通信
websocket协议本质上是一个基于TCP的协议
是先通过HTTP/HTTPS协议发起一条特殊的HTTP请求进行握手后创建一个用于交换数据的TCP连接
此后服务端与客户端通过此TCP连接进行实时通信

### 跨域
nginx 代理
```
server {
       listen 80;
       server_name music.fenghou.site;
       root /admin/fenghou/www/super_music/view/dist;
       location / {
            index index.html;
       }
       location /nateAPI/ {
            proxy_pass http://localhost:4000;
       }
       location /MusicAPI/ {
            proxy_pass http://localhost:4000/;
       }
    }
```
node 中间件
```javascript
var express = require('express')
var app = express()
var proxyMiddleware = require('http-proxy-middleware')
let _opts = {
                                target: 'http://114.215.198.55:9004',
                                changeOrigin: true,
                                pathRewrite: {
                                  '^/goodsAdmin': ''
                                },
                              }
app.use(proxyMiddleware('/goodsAdmin', _opts))
app.listen()
```
webpack dev-server
```javascript
module.exports = {
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
          rewrites: [
            { from: /.*/, to: path.join('/', 'index.html') },
          ],
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: 'localhost',
        port: '8080',
        open: true,
        overlay: { warnings: false, errors: true },
        publicPath: '/',
        proxy: {
            '/goodsAdmin': {
                    target: 'http://114.215.198.55:9004',
                    changeOrigin: true,
                    pathRewrite: {
                      '^/goodsAdmin': ''
                    },
                  },
        },
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
          poll: false,
        }
      },
}
```

XSS：跨站脚本（Cross-site scripting）
CSRF：跨站请求伪造（Cross-site request forgery）

## 浏览器
### 缓存
缓存主要设置在请求头
request header
Pragma
Cache-Control no-cache、no-store、max-age
if-none-match
if-modified-since

response header
Etag
expires
last-modified

### 存储
cookie
localStorage
localSession

### 渲染
页面加载
域名解析-页面解析-渲染
渲染流程
dom解析成 DOM Tree 此时遇到资源文件开始下载 
遇到css下载 并且开始解析
遇到js文件下载 并且开始解析
遇到图片资源 开始下载
所以说js 放在头部加载 会阻塞 dom解析

css 解析 CSS Rule Tree 并且合并到DOM Tree 成 Rendering Tree  这是用到的css 里的图片资源开始请求加载
Rendering Tree 渲染树并不等同于DOM树 因为一些像display:none的东西就没必要放在渲染树中了。
然后 计算每个Element的位置 又叫layout和reflow过程
最后通过调用操作系统Native GUI的API绘制

js加载事件

windows.onload dom节点 资源全部加载完成

重排和重绘

动画优化

[浏览器工作原理](https://pic1.zhimg.com/80/bef065b504473d590387ae37089a72c3_hd.jpg)

[WebKit for Developers](https://www.paulirish.com/2013/webkit-for-developers/)
[VelocityConf: Rendering Performance Case Studies](https://link.zhihu.com/?target=https%3A//speakerdeck.com/addyosmani/velocityconf-rendering-performance-case-studies)
[GPU Accelerated Compositing in Chrome](https://link.zhihu.com/?target=http%3A//www.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome)
[High Performance Animations](https://link.zhihu.com/?target=http%3A//www.html5rocks.com/en/tutorials/speed/high-performance-animations/)
[Preventing layout thrashing](https://link.zhihu.com/?target=http%3A//wilsonpage.co.uk/preventing-layout-thrashing/)
[How Browsers Work: Behind the scenes of modern web browsers](https://link.zhihu.com/?target=http%3A//www.html5rocks.com/en/tutorials/internals/howbrowserswork/)
[16毫秒的优化——Web前端性能优化的微观分析](https://link.zhihu.com/?target=http%3A//velocity.oreilly.com.cn/2013/ppts/16_ms_optimization--web_front-end_performance_optimization.pdf)
[CSS3动画那么强，requestAnimationFrame还有毛线用？](https://link.zhihu.com/?target=http%3A//www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%25E5%258A%25A8%25E7%2594%25BB%25E7%25AE%2597%25E6%25B3%2595/)
[Compositing in Blink / WebCore: FromWebCore::RenderLayer to cc:Layer](https://link.zhihu.com/?target=http%3A//flaminghorns.com/chromium_graphics/Compositing%2520in%2520Blink%2520-%2520WebCore-%2520From%2520WebCore--RenderLayer%2520to%2520cc-Layer.pdf)
[Webkit技术内幕](https://link.zhihu.com/?target=http%3A//blog.csdn.net/milado_nju)
