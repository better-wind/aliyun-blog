title: 'Nginx在前端'
date: 2017-03-31 09:55:58
tags:
    - nginx
---
总结一些我碰到的Nginx在前端的应用
<!--more-->

### 服务器
nginx可以用来当做静态文件的服务器
如 本文所在的博客 就是通过nginx来部署的
通过root来指定 访问的静态资源的目录
```javascript
server {
       listen 443;
       ssl on;
       ssl_certificate /admin/ali-ssl/fenghou_site.pem;
       ssl_certificate_key /admin/ali-ssl/fenghou_site.key;
       ssl_session_timeout 5m;
       ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
       ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
       ssl_prefer_server_ciphers on;
       server_name fenghou.site;
       root /admin/fenghou/www/aliyun-blog/hexo;         
       location / {
                index index.html;
        }
}

```

### 反向代理
前后端分离的项目中
nginx除了起到服务器的作用 
还可以用来做请求代理 解决一系列的跨域问题
说道代理 有的叫正向代理 有的叫反向代理
那么是怎么区分的呢？ 很简单
正向代理 服务器不知道 真实的用户
反向代理 用户不知道 真实的服务器

```javascript
server {
       listen 80;
       server_name demo.fenghou.site;
       root /admin/fenghou/www/demo/view/dist;
        location / {
            index index.html;
        }
        location /demoAPI/ {
            proxy_pass http://localhost:4000;
        }
        location /logAPI/ {
            proxy_pass http://localhost:5000/;
        }
}
```


