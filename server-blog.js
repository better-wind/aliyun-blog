var fs = require('fs'),
    path = require('path'),
    stream = require('stream'),
    process = require('child_process'),
    _public = __dirname+'/hexo-blog/public',
    _blog = __dirname+'/hexo';
Blog = {
    init:function(){
        var self = this;
        fs.exists(_public, function (exists) {
            if(!exists){
                console.log('========= public文件没有生成 ==========');
                console.log('=========  public文件生成中  ==========');
                self.hexoG();
            }
            else{
                self.exisitBlog()
            }
        });
    },
    exisitBlog:function(){
        var self = this;
        fs.exists(_blog, function (exists) {
            if(exists){
                console.log('=========   Blog文件删除中   ==========');
                self.deleteFolderRecursive(_blog);
                console.log('=========  Blog文件删除成功  ==========');
            }
            fs.rename(_public,_blog,function(err){
                if(err)
                    throw err;
                console.log('=========  Blog文件生成成功  ==========');
            })
        });
    },
    hexoG:function(){
        var self = this;
        process.exec('cd hexo-blog && hexo clean && hexo g', function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            console.log('========= public文件生成成功 ==========');
            self.exisitBlog()
        });
    },
    deleteFolderRecursive:function(path){
        var self = this;
        var files = [];
        if( fs.existsSync(path) ) {
            files = fs.readdirSync(path);
            files.forEach(function(file,index){
                var curPath = path + "/" + file;
                if(fs.statSync(curPath).isDirectory()) {
                    self.deleteFolderRecursive(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }
}


Blog.init();