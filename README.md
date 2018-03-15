# react-learn
react学习项目

## Quick Start
  React 快速起步，详见 [react-01](https://github.com/lysuse/react-learn/blob/master/react-01/README.md)
## Advanced Guides
  React 进阶， 主要介绍常见的事件、组件、高阶组件等使用。
## Redux
  主要介绍 Action , Reducers , Store, Middleware, ActionCreator

  对源码 applyMiddleware 进行了学习

  在 applyMiddleware 中 创建了中间 middleware

  ```js
  const middlewareAPI = {
    getState: store.getState,
    dispatch: (...args) => dispatch(...args)
  }

  chain = middlewares.map(middleware => middleware(middlewareAPI))
  //串联执行dispatch,返回最后一次执行的dispatch`
  dispatch = compose(...chain)(store.dispatch)
  //返回新的 store
  return {
    ...store,
    dispatch
  }
  ```
