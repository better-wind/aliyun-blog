title: '个人项目经验'
date: 2018-05-10 11:01:38
tags:
    - interview
---

本文 需 3 分钟左右 阅读时间
<!--more-->

### 格家网络

`2017.03 - 至今` 
商家后台 
负责项目的构建 模块化 组件化开发
负责项目的开发与维护

`2017.07 - 至今`
商品库管理
负责项目的构建 模块话 组件化开发
负责项目的开发与维护
>在这一段时间 
独自开发了商家后台 和 商品库管理系统
期间碰到了很多很多问题 举几个例子
`架构层面`
1.作为传统的管理页面 很多都是查询搜索结果页 那么 
能不能作为业务组件抽离出来做成可配呢 ？
能不能从项目中抽离出来进行托管 然后在别的项目中应用呢 ？
2.对于重复请求 二次点击 有没有通用的实现拦截呢 ？
对于请求的成功失败 有没有全局通用的错误回调机制呢 ？
3.从项目架构层面考虑什么样的设计能满足组件 接口 路由 vuex 等的合理调用呢 ？
从代码层面考虑 什么样的解构 能满足 拓展性呢 ？
`业务逻辑层面`
搜索页面中 能不能对搜索选项进行判断 能不能根据已有的搜索选项 进行加载呢 ？全局的回车搜索呢 ？
批量上传 如何保证顺序 ？
省市区选择树 如何保证页面不卡 ？
分页选择 再次进入当前页 如何渲染上次的选中值 ？
`布局层面` 
如何适应不同窗口 ？
如何定义基础样式 ？

目前为止 我搭建的项目架构 已在组内 推广使用
我本地项目已将 部分业务组件 托管在npm上

期间明白 
开发前的前后端沟通 很重要
想清楚再写 很重要
在信息共享时代 想法和视野 很重要

### 琐碎的个人时间

这个想了想还是放第二吧
这一年 其实基本上大部分的时间 都在处理 业务逻辑 上 其实对于项目中用到的各种框架 其实知之甚少
也有过不少想法 实际落地甚少  
回头看看 感觉自己还是有点进步的
这一年多研究过各种框架源码 也能明个大概 
发现css 其实很难 但从其设计角度研究研究 其实也不难 很多时候顺其自然 反倒效果更好
发现js  基础真的很重要  是不是看看总能研究出点新东西
发现canvas 其实能做的事真的很多 意料之外清理之中
发现前端自动化脚本 也是一个js 可以随心所欲
发现各种 .xxx 文件其实也不那么 可怕
发现请求协议 再怎么复杂多变 还是有迹可循
发现服务器部署维护 也不是那么遥不可及 
发现代码的托管 真的也只是托管我的代码
发现所有的框架 其实只是为了方便开发
发现技术真的没有好坏 只有适不适用业务

### 想去网
这期间 有快一年是只有我一个前端
大部分的项目 前后端没有分离 前端采用的 velocity 模版
那会对于网站的日常开发 是基于zepto 并且自己写了一套 rem的布局方案
对于日常的活动开发 没有引用第三方的框架 自己写了个基础的js作为基础库 
图片的懒加载也是自己coding实现
能共用的也基本上共用了
大部分项目构建工具用的是gulp 也能配置热加载 自动更新
印象里 那段时间其实做了很多东西  
但现在回过头看 其实好像没做什么

`2017.01`
   微信小程序开发（好设计精选）
   负责项目架构，登录逻辑，下单支付主流程开发
`2016.07 - 2016.08`
   网站交易模块重构
   负责交易相关逻辑接口梳理和重写
   包括下单，二次支付，合并付款，优惠券选择
   商家版买家版订单管理，购物车，商品详情等
`2016.06 - 2016.07`
   网站退货退款模块
   新增网站退货退款功能
   移动端App内嵌H5页面
`2016.03 - 2016.04`
   微信商城
   H5微信商城页面改版
`2015.08 – 2017.03`
   双十一活动、双十二活动、年中活动、年终活动
   二周年活动、情人节活动、类黑凤梨传播活动、
   微信书法、运营日常活动模板等等
   
### 感谢阅读
当然 文字是苍白 我更倾向于面对面的交流