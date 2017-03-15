title: 'Node-Spider'
date: 2016-12-13 19:03:06
tags:
    - node
---
Node学习入门，练习爬虫再适合不过了
这里通过爬区某图片网站近(10万张图片)的例子，介绍爬虫的过程
<!--more-->

### 爬虫分析设计

抓取的是 ‘http://www.mzitu.com‘ 网站
图片大致有五个类目
每个类目下分页规则
http://www.mzitu.com/类目/page/1
http://www.mzitu.com/类目/page/2

每一个有25个专题
专题详情页 http://www.mzitu.com/专题id
专题详情页分页规则
http://www.mzitu.com/专题id/1
http://www.mzitu.com/专题id/2

因此第一次鉴于此 爬虫设计如下
先获取单个类目下专题(图片和Id)
专题图片根据 类目/当前page数/图片 路径保存
将获取的id暂存
知道获取完全部全部类目专题
然后开始获取专题详情
确定要获取的专题详情的所有分页数
最后爬区所有分页数

### 用到的模块

```javascript
var superagent = require('superagent'); //请求封装模块
var async = require('async');  //并发控制模块
var cheerio = require('cheerio'); //抓取页面dom节点模块
var fs = require("fs");
```

### 数据准备

```javascript
var sUrl = 'http://www.mzitu.com'; //爬取目标
var aItems = []; //单个类目下需要爬取的链接
var aTagList = ['/','/xinggan','/japan','/taiwan','/mm']; //所有类目
var aDirList = ['index','xinggan','japan','taiwan','mm']; //爬取存放路径
var nCurrentTag = 0; //当前爬取类目
var aIdList = []; //专题Id
var aNextPage = []; //专题详情
var aNxtItems = []; //专题详情下需要爬区的链接
```

### 获取所有专题

```javascript
function start(page){
    superagent
            .get(page)
            .end(function (err, response) {
                if (err) {
                    console.log(err.status);
                }
                if (response.status === 200) {
                    var $ = cheerio.load(response.text);
                }
                var nPageLen = $('.nav-links a.next').prev().text();  // 获取页数
                for(var i = 0;i < nPageLen ;i++){
                    aItems.push(page+'/page/'+(i+1));
                }
                var sName = page.replace('http://www.mzitu.com','');
                sName = sName ? sName : 'index';
                // 新建类目 存放目录
                fs.mkdir(__dirname+'/uploa/'+sName.replace('/',''),function(err){
                    if(err){
                        throw err
                    }
                })
                fetchPage();
            });
}
function fetchPage(){
    var concurrencyCount = 0;
    var fetchUrl = function(url,callback){
        var fetchStart = new Date().getTime();
        concurrencyCount++;
        console.log('并发数'+concurrencyCount+'====url:'+url);
        superagent.get(url)
            .end(function(err,res){
                if(err){
                    // callback(err,url);
                    // return next(err);
                }
                var time = new Date().getTime() - fetchStart;
                // console.log('抓取'+url+'成功,耗时'+time)
                concurrencyCount--;
                if(res.status === 200){
                    var $ = cheerio.load(res.text);
                }
                //爬取数据处理
                getDetail($,url,function(rs){
                    // _html += rs;
                })
                callback();
            })
    }
    // 控制并发数
    async.mapLimit(aItems,5,function(myUrl,callback){
        fetchUrl(myUrl,callback);
    },function(err,result){
        nCurrentTag++;
        if(nCurrentTag < aTagList.length){
            // console.log('====================开始抓取下一个类目====================');
            aItems = [];
            start(sUrl+aTagList[nCurrentTag]);
        }
        else{
            console.log('====================开始抓取详情页=========================');
            // getNextPage();
        }
    })
}
function getDetail($,url,callback){
    //确定图片名称
    var dirList = url.replace('http://www.mzitu.com/','').split('/');
    var dirName = dirList[0]+'/'+dirList[1]+dirList[2];
    if(dirList.length < 3){
       dirName = 'index/'+dirList[0]+dirList[1];
    }
    var domItemA = $('#pins li a'); // 获取Id
    var domItem = $('#pins li a img'); //获取图片
    var srcList = []
    domItem.each(function(idx,element){
        var $ele = $(element);
        var src = $ele.attr('data-original');
        var id = $ele.parent().attr('href').replace('http://www.mzitu.com/','');
        aSrcList.push(src);
        aIdList.push(id);
    })
    // 下载专题图片
    downImg(aSrcList,dirName);
}
function downImg(list,dirName){
    fs.mkdir(__dirname+'/upload/'+dirName,function(err){
        if(err){
            throw err
        }
    })
    var savePath = __dirname+'/uploa/'+dirName+'/' + narr[0]  +'_'+ narr[1] + '_' + narr[2];
    function binaryParser(res, callback) {
            res.setEncoding('binary');
            var imgData = '';
            res.on('data', function (chunk) {
                imgData += chunk;
            });
            res.on('end', function () {
                fs.writeFile(savePath, new Buffer(imgData, 'binary'),function(err) {
                            if(err) {
                                console.log(err);
                            }
                            console.log(url+'下载成功')
                        });
            });
        }
    var downUrl = function(url,callback){
        var narr = url.replace("http://i.meizitu.net/thumbs/", "").split("/")
        supergent.get(url)
        // .pipe(fs.createWriteStream(savePath))
                .parse(binaryParser)
                .end(function(err,res){
                })
    }
    async.mapLimit(list,5,function(myUrl,callback){
        downUrl(myUrl,callback);
    },function(err,result){
    })
}


```