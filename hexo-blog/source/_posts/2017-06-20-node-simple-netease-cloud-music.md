title: 'XX云音乐'
date: 2017-06-20 16:30:19
tags:
    - node
    - react
---
整理中
<!--more-->

前端 React
数据库 暂时不用
服务端 express ---> koa 迁移
API    (网易云Node音乐API)[https://binaryify.github.io/NeteaseCloudMusicApi/#/]

redux 中的 dispatch 行为会被所有的reducer 捕获
react-redux 的 connect 中 传入的 state 会混合在 组件的 props
传入的action 如果有值 会 传入调用 调用dispatch()的方法 如果不传 则会 传入 dispatch方法
```javascript
export default connect(
    (state)=>{
        let {count} = state.User
        return {
            count
        }
    },
    (dispatch) => {
        const type  = { type: 'CAT' }
        return {
            onIncreaseClick: () => dispatch(type)
        }

    }
)(Index)
class Index extends React.Component {
    
    constructor(){
        super()
    }
    render() {
        const { count, onIncreaseClick } = this.props
       
        return (
            <div>
                <span>{count}</span>
                <button onClick={onIncreaseClick}>Increase</button>
          </div>
        )
        //如果不传第二个参数
        const { count, dispatch } = this.props
                
                return (
                    <div>
                        <span>{count}</span>
                        <button onClick={()=>{
                            const type  = { type: 'CAT' }
                            dispatch(type)
                        }}>Increase</button>
                  </div>
                )
    }
}


```

react 中 默认props
```javascript
//way A
class Index extends React.Component {
    static defaultProps = { demo : 12 }
}
// way B
Index.defaultProps = { demo : 12 }

```

react 中的 props 验证
React.PropTypes 自 React v15.5 起已弃用。请使用 prop-types 库代替
```javascript
Demo.propTypes = {
    name:  PropTypes.string.isRequired
}
// 是propTypes 不是PropTypes 也不是 propsTypes
// 是propTypes 不是PropTypes 也不是 propsTypes
// 是propTypes 不是PropTypes 也不是 propsTypes
```
### 关于路由
react-router 版本 > 4.0
exact 全匹配
Switch 匹配一个后不向下匹配

<Link to="/a/b"> 下面两个都会匹配
<Route path="/a"></Route>
<Route path="/a/b"></Route>
可以通过 exact 和 Switch 解决

strict 匹配链接的斜杠 
true  /one 只匹配 /one 
false /one 匹配  /one /one/ /one/two 
Route component={XXX} render={()=> XXX}

children 不管path是否被匹配 都会映射

默认是链接渲染

### 前端
react react-router react-redux 

### 服务端
koa express pm2