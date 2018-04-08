title: 前端异常监控
date: 2018-03-26 09:40:57
tags:
    - nginx
    - js
---
前端页面报错监听 统计
<!--more-->

### 异常捕获
script error
window.error 进行全局捕获
对于从cdn引入的js script type 
```javascript
//Vue
Vue.config.errorHandler = function (err, vm, info) {
  let {
    message, // 异常信息
    name, // 异常名称
    script,  // 异常脚本url
    line,  // 异常行号
    column,  // 异常列号
    stack  // 异常堆栈信息
  } = err;
  console.log(err)
}
//React
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });

        // 将异常信息上报给服务器
        logErrorToMyService(error, info);
    }

    render() {
        if (this.state.hasError) {
            return '出错了';
        }

        return this.props.children;
    }
}
//window
window.onerror = function(errorMessage, scriptURI, lineNo, columnNo, error) {
  console.log('errorMessage: ' + errorMessage); // 异常信息
  console.log('scriptURI: ' + scriptURI); // 异常文件路径
  console.log('lineNo: ' + lineNo); // 异常行号
  console.log('columnNo: ' + columnNo); // 异常列号
  console.log('error: ' + error); // 异常堆栈信息
};
```

### 异常上报
模拟图片请求



### 异常分析

nginx 日志分析 


页面 图形可视化


[把前端监控做到极致](https://zhuanlan.zhihu.com/p/32262716)

