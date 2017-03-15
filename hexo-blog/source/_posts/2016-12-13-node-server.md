title: 'Node-server'
date: 2016-12-13 19:02:26
tags:
    - node
---
用Node搭建一个静态资源访问服务器

<!--more-->
用到的模块

```javascript
var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');
```
思路 获取访问路径，以文件后缀判断文件类型
```javascript
var mimetype = {
    'txt': 'text/plain',
    'html': 'text/html',
    'css': 'text/css',
    'xml': 'application/xml',
    'json': 'application/json',
    'js': 'application/javascript',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'png': 'image/png',
    'svg': 'image/svg+xml'
}
```

获取请求的时候判断请求文件是否存在，决定返回的类型

```javascript
http.createServer(function(req,res){
    var pathname = url.parse(req.url).pathname,
        realPath = path.join(__dirname,'/static',pathname);
    var body = [];
    req.on('data',function(data){
        body.push(data);
    })
    req.on('end',function(){
        body = Buffer.concat(body);
    })
    fs.exists(realPath,function(ex){
        if(ex){
            var rs = fs.createReadStream(realPath);
            res.writeHead(200,{
                'Content-Type':mimetype[realPath.split('.').pop()] || 'text/plain'
            })
            rs.on('data',res.write.bind(res))
            rs.on('close',res.end.bind(res));
        }
        else{
            page_404(req,res,realPath); //错误页面
        }
    })
}).listen(3000)

```

请求不存在

```javascript
function page_404(req,res,path){
    res.writeHead(404,{
        'Content-Type':'text/html'
    })
    res.write('<!doctype html>\n');
    res.write('<title>404 Not Found</title>\n');
    res.write('<h1>Not Found</h1>');
    res.write(
        '<p>The requested URL ' +
        path +
        ' was not found on this server.</p>'
    );
    res.end();
}

```
