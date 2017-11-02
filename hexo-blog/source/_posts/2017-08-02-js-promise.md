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




