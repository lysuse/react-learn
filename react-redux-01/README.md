# redux
[官方文档](https://redux.js.org/introduction/motivation)

[中文文档](http://www.redux.org.cn/docs/introduction/Motivation.html)


## 核心概念

  单向控制数据的改变 action --dispatch-->> reducers --change state-->> new state

### action

  Action 就是一个普通 JavaScript 对象（注意到没，这儿没有任何魔法？）用来描述发生了什么。
  ```js
  {type: 'ADD_TODO', text: 'Go to swimming pool' }
  ```

### reducers

  Reducers 把状态和动作连接起来，它并没有什么神奇之处，它只是一个函数，它以状态State和动作Action作为参数，并返回应用程序的下一个状态State。

  ```js
  function visibilityFilter(state = 'SHOW_ALL', action) {
    if (action.type === 'SET_VISIBILITY_FILTER') {
      return action.filter;
    } else {
      return state;
    }
  }
  function todos(state = [], action) {
    switch (action.type) {
      case 'ADD_TODO':
        return state.concat([{text: action.text, completed: false}]);
        break;
      case 'TOGGLE_TODO':
        return state.map(
          (todo, index) =>
            action.index => index
            ? {text: todo.text, completed: !todo.completed }
            : todo

        )
        break;
      default:
        return state;
    }
  }
  ```
  对于复杂的的状态(state)可以采用组合调用的方式。
  ```js
  function todoApp(state = {}, action) {
    return {
      todos: todos(state.todos, action),
      visibilityFilter: visibilityFilter(state.visibilityFilter, action)
    }
  }
  ```

## 三原则

#### 单一数据源
  整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。

#### State是只读的
  唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象

#### 使用纯函数来执行
  为了描述 action 如何改变 state tree ，你需要编写 reducers。


### 容器组件(Container Component)和展示组件(Presentational Component)

|      | 展示组件        |  容器组件      |        
| :------------- | :------------- | :------------- |
|作用|描述如何展现（骨架、样式）|描述如何运行（数据获取、状态更新）  |
|直接使用 Redux|否|是|
|数据来源| props	监听|Redux state|
|数据修改|从 props 调用回调函数	|向 Redux 派发 actions|
|调用方式|手动|通常由 React Redux 生成|

  建议展示组件和容器组件按照如下规则使用：

  | 容器组件 | 展示组件 |
  | :--------- | :--------- |
  | Stateful(有状态)  |  Stateless(无状态)   |
  | 多使用Class创建  |  多使用Function创建   |


## Store

  Store就是把Action和Reducer联系到一起的对象。Store有以下职责：

  - 维持应用的state；
  - 提供 getState() 方法获取state；
  - 提供 dispatch(actiion) 方法更新state；
  - 通过 subscrible(listener) 注册监听器；
  - 通过 subscrible(listener) **返回的函数**注销监听器

  创建store

  ```js
  let store = createStore(todoApp, window.STATE_FROM_SERVER)
  ```
  第二个参数是可选的, 用于设置 state 初始状态。
  
  ```js
  import { createStore } from 'redux'
  import rootReducer from './reducers'
  let store = createStore(rootReducer)

  ```
