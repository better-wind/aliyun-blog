title: 'Node-Session'
date: 2017-08-20 10:20:32
tags:
    - node
    - js
---
Node中使用Session
<!--more-->
> server.js

```javascript
var bodyParser  =  require('body-parser');
var session = require('express-session');

var app = require('express')()
var router = require('./models/user')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    name:'SESSION',
    secret: 'recommand 128 bytes random string',
    cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use('/', router);
app.listen(4000)
```
> ./models/user.js

```javascript
var express = require('express');
var router = express.Router();
var userControl = require('../controller/user')
router.post('/user/login',userControl.login)
router.post('/user/check',userControl.check)
router.post('/user/create',userControl.createUser)
module.exports = router;
```

>../controller/user.js

```javascript
var userService = require('../service/user')

module.exports = {
    login: function(req,res){
        userService.login(req,res)
    },
    check: function(req,res){
        userService.check(req,res)
    },
    createUser: function (req,res) {
        userService.createUser(req,res)
    }
}
```
> ../service/user.js

```javascript
var User = require('./../dataBase/user')
module.exports = {
    login:function(req,res){
        const name = req.body.name,
            pwd = req.body.pwd
        var user = new User({
            name:name,
            password:pwd
        })
        user.findUser(user.name,user.password)
            .then((rs)=>{
                let _data = {}
                if(rs.length){
                    _data = {
                        code:200,
                        data:rs[0]
                    }
                    req.session.user = rs[0].id;
                } else {
                    _data = {
                        code:500,
                        msg:'用户名或密码不正确',
                    }
                }
                res.send(_data)
            })
    },
    check:function(req,res){
        let _data = {}
        if(req.session.user){
            _data = {
                code:200,
                data:true
            }
        }
        else {
            _data = {
                code:200,
                data:false
            }
        }
        res.send(_data)
    },
    createUser:function(req,res){
        const name = req.body.name,
            pwd = req.body.pwd
        var user = new User({
            name:name,
            password:pwd
        })
        user.createUser(user.name,user.password)
            .then((rs)=>{
                let _data = {}
                _data = {
                    code:200,
                    data:rs[0]
                }
                req.session.user = rs[0].id;
                res.send(_data)
            })
    },
}
```