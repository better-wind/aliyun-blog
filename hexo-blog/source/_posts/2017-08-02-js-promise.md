title: 'Js异步编程'
date: 2017-08-02 10:19:25
tags:
    - js
---
异步 总结(整理中)
<!--more-->
### promise
通过简易实现 promise 了解原理
```javascript
{
    const PENDING = 'PENDING'
    const FULFILLED = 'FULFILLED'
    const REJECTED = Symbol();
    function TP(fn){
        let state = PENDING
        let value = null
        let handel = []
        function fulfill(result){
            state = FULFILLED
            value = result
            handel.forEach(next)
        }
        function resolve(result,idx){
            let then = result && result.then && typeof result.then == 'function' ? result.then : null;
            // let then = typeof result
            if (then) {
                then.bind(result)(resolve)
                return
            }
            fulfill(result)


            // console.log(result)
            // console.log('resolve~~~',idx)
            // fulfill(result)
        }
        function next({onFulfill},idx){
            // console.log('next~~~',idx)
            switch (state){
                case FULFILLED:
                    onFulfill && onFulfill(value)
                    break
                case PENDING:
                    handel.push({onFulfill})
                    break
            }
        }
        this.then = function(onFulfill,idx){
            return new TP((resolve)=>{
                // console.log('then~~~',idx)
                next({
                    onFulfill:(val)=>{
                        resolve(onFulfill(val),idx)
                    }
                },idx)
            })

        }
        fn(resolve)
    }

    new TP((resolve)=>{
        // console.log('TP-1')
        setTimeout(function(){
            resolve('TP-Resolve1',0)
        },2000)
    }).then((s)=>{
        console.log('TP-1',s)
        return new TP((resolve)=>{
            setTimeout(function(){
                resolve('TP-Resolve2',0)
            },2000)
        })
    },1).then((s)=>{
        console.log('TP-2',s)
    },2).then(()=>{
        console.log('---END---')
    })
}
```
可以看到 promise 回调是通过调用 promise中的 rosolve去触发回调函数的
关于promise状态的改变 只会触发一次 由pedding 变为 resolve 或者 reject
```javascript
const start = new Promise((reslove,reject)=>{
    reslove()
    reject()
})
//即只会执行 reslove
```
关于异常的捕获 在声明时的异常可以在 reject或者catch中捕获
而在then中的异常只能在catch中捕获
```javascript
const start = new Promise((reslove)=>{
    throw new Error('我能在Reject中和catch中捕获')
})
start.then(()=>{
    throw new Error('我能在catch中捕获')
},()=>{
    console.log('我只能捕获new Promise()中的异常')
}).catch(()=>{
    console.log('我能捕获所有异常 如果在reject中捕获了 那我就不捕获了')    
})
```
Promise的嵌套 then可以返回的个promise对象支持链式回调
```javascript
const A = new Promise((resolve)=>{
    resolve('A')
})
const B = new Promise((resolve)=>{
    resolve('B')
})
A.then((rs)=>{
    console.log(rs)
    return B
}).then((rs)=>{
    console.log(rs)
})
//而不是
A.then((rs)=>{
    console.log(rs)
    B.then((rs)=>{
        console.log(rs)
    })
})

```

### generator
```javascript
function* genT(arr){
    for(let i = 0,_len = arr.length;i<_len;i++){
        if(typeof arr[i] === 'number'){
            yield arr[i]
        } else {
            yield* genT(arr[i])
        }

    }
}
let _arr = [1,2,[3,4]]
for(let g of genT(_arr)){
    console.log(g)
}
```
### async await
可以理解为generator 的语法糖
实现过程将generator 的表述移到语法内部实现(await)
async函数返回一个 Promise 对象，可以使用then方法添加回调函数
await 后面一般跟promise 如果不是的话会执行promise.reslove()
await 只能作用在 async方法中

譬如
```javascript
new Promise().then(()=>{
    await start()
})
[].forEach(()=>{
    await start()
})
//都会报错
```
await 返回的应该是 一个promise.resolve()中返回的数据

```javascript
const awaitLoad = ()=> new Promise((reslove)=>{
    var arr = [1,2,3,4,5]
    reslove(arr)
})
const start = async ()=>{
    var load = await awaitLoad()
    console.log(load)
    //[1,2,3,4,5]
    return load
}
start().then((rs)=>{
    console.log(rs)
    //[1,2,3,4,5]
})
```

关于异常返回从处理
如果 await 后面的promise异常执行了reject 那么 后面的命令不再执行
因此要把问题抛出来
```javascript
const start = async ()=>{
    //一种写法
    try {
        await fn()
    } catch(err){
        console.log(err)
    }
    //第二种
    await fn().catch((err)=>{
        console.log(err)
    })
    
}
```







