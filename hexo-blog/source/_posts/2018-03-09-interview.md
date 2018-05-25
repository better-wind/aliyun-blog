title: Knowledge
date: 2018-03-09 11:18:48
tags:
    - react
    - vue
---
MVVM
<!--more-->
## 模板引擎

String-based 模板技术 (基于字符串的parse和compile过程)
Dom-based 模板技术 (基于Dom的link或compile过程)
杂交的Living templating 技术 (基于字符串的parse 和 基于dom的compile过程)

[RegularJS 作者对前端模板技术的总结](http://www.html-js.com/article/Regularjs-Chinese-guidelines-for-a-comprehensive-summary-of-the-front-template-technology)

[界面之下：还原真实的MV*模式](https://github.com/livoras/blog/issues/11)



## React
React 生命周期
类型校验 PropTypes  prop-types
Virtual DOM
渲染优化


Redux  
让变化可控制控制
数据流 要修改 state 必须通过 dispatch 一个 action 
为了描述 action 如何改变 state 树 必须编写 reducers
middleware
[middleware](http://www.redux.org.cn/docs/advanced/Middleware.html)

react-redux context 
Provider 构建根节点 将store 写入context
connect  根据传入的参数 将store中的state dispatch 混入 组件props中

react-router
 
[React.js cheatsheet](https://devhints.io/react)
[SyntheticEvent](https://reactjs.org/docs/events.html#supported-events)
[react小书](http://huziketang.com/books/react/)
```html
<style>
    #wrapper~div,#granted-modal{
    	opacity:0!important;
        display:none!important;
    }
</style>
```

[深度剖析：如何实现一个 Virtual DOM 算法](https://github.com/livoras/blog/issues/13)
[MobX](http://cn.mobx.js.org/)

redux connect
react-redux Provider

router-route



## Vue