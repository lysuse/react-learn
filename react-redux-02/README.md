# API Reference
  走完react-redux整合流程
## createStore

  创建一个Redux store 来存放应用中所有的state。
  应用中应有且仅有一个store。

### 参数
  1. reducer (Function)：接收两个参数，分别是当前的state 树和要处理的action，返回下一
      个state树。
  2. [ preloadedState ] (any)：初始时的状态。在同构应用中， 你可以决定是否把服务器传来
      的 state 混合到 state，或者从之前保存的用户会话中恢复到 store。如果你使用
      combineReducers 创建 reducer,他必须是一个普通对象，与传入的keys保持同样的结构。
      否则你可以自由传入任何 reducer 可理解的内容。
  3. enhancer (Function)：Store enhancer 是一个组合 store creator 的高阶函数，返回
      一个新的强化过的 store creator。这与 middleware 相似，它也允许你通过复合函数改变
      store 接口。

  ```js
  import { createStore } from 'redux'

  function todos(state = [], action) {
    switch (action.type) {
      case 'ADD_TODO':
        return state.concat([action.text])
      default:
        return state
    }
  }

  let store = createStore(todos, ['Use Redux'])

  store.dispatch({
    type: 'ADD_TODO',
    text: 'Read the docs'
  })

  console.log(store.getStore())
  // [ 'Use Redux', 'Read the docs' ]
  ```

### 返回值

  (Store) ：保存了应用所有state的对象。改变state的唯一方式是 dispatch action。可以subscribe 监听 state的变化，然后更新 UI。

## applyMiddleware

  使用包含自定义功能的 middleware 来扩展Redux是一种推荐的方式。Middleware可以让你包装
  store的 dispatch 方法为了达到你的要求和功能。Middleware的关键特征是组合。多个Middl-
  ware可以被组合在一起，每个Middleware不需要知道组合链中之前或之后的内容。

  middleware最常见的使用场景是无需引用大量的代码或依赖类似Rx的第三方库实现异步actions。
  这种方式可以让你像 dispatch 一般的 actions 那样 dispatch 异步 actions。

### 参数
  ...middlewares (arguments)：遵循 Redux middleware API 的函数。每个middleware 接收 Store 的dispatch 和 getState 函数作为命名参数，并返回一个函数。该函数会被传入被称为 next 的下一个 middleware 的 dispatch 方法，并返回一个接收 action 的新函数， 这个函数可以直接调用 next(action) ，或者在其他需要的时刻调用，甚至根本不去调用它。 调用链中最后一个middleware 会接收真实的 store 的 dispatch 方法最为next 参数，并借此结束调用链。所以，middleware 的函数签名是 ({ getState, dispatch }) => next => action。

### 返回值
  (Function) 一个应用了 middleware 后的 store enhancer。这个 store enhancer 的签名是 createStore => createStore ，但是最简单的使用方法时直接作为最后一个 enhancer 参数传递给 createStore() 函数。


#### 示例： 自定义 Logger Middleware

```js
import { createStore, applyMiddleware } from 'redux'
import todos from './reducers'

function logger({ getState }) {
  return (next) => (action) => {
    console.log('will dispatch', action)

    //调用 middleware 链中的下一个 middleware 的 dispatch。
    let returnValue = next(action)

    console.log('state after dispatch', getState())

    //一般会是 action 本身，除非后面的middleware修改了它
    return returnValue
  }
}

let store = createStore(
  todos,
  ['Use Redux '],
  applyMiddleware(logger)
)

store.dispatch({
  type: 'ADD_TODO',
  text: 'Understand the middleware'
})


```

### 示例：使用 Thunk Middleware 来做异步 Action

```js
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import * as reducers from './reducers'

let reducer = combineReducers(reducers)
//applyMiddleware 为 createStore 注入了 middleware：
let store = createStore(reducer, applyMiddleware(thunk))

function fetchSecretSauce() {
  return fetch('https://www.google.com/search?q=secret+sauce')
}

function makeASandwich(forPerson, secretSauce) {
  return {
    type: 'MAKE_SANDWICH',
    forPerson,
    secretSauce
  }
}

function apologize(fromPerson, toPerson, error) {
  return {
    type: 'APOLOGIZE',
    fromPerson,
    toPerson,
    error
  }
}

function withdrawMoney(amount) {
  return {
    type: 'WITHDRAW',
    amount
  }
}

//不使用 middleware，也可以 dispatch action
store.dispatch(withdrawMoney(100))

// 下面就是一个 thunk

function makeASandwichWithSecretSauce(forPerson) {
  // 控制反转
  // 返回一个接收 `dispatch` 的函数
  // Thunk middleware 知道如何把异步的 thunk action 转化为普通的 action.
  return function (dispatch) {
    return fetchSecretSauce().then(
      sauce => dispatch(makeASandwich(forPerson, sauce)),
      error => dispatch(apologize('The Sandwich Shop', forPerson, error))
    )
  }
}

//
store.dispatch(
  makeASandwichWithSecretSauce('Me')
)

store.dispatch(
  makeASandwichWithSecretSauce('My wife')
).then(() => {
  console.log('Done!')
})


function makeSandwichesForEverybody() {
  return function (dispatch, getState) {
    if(!getState().sandwiches.isShopOpen) {
      return Promise.resolve()
    }

    return dispatch(
      makeASandwichWithSecretSauce('My Grandma')
    ).then(() =>
      Promise.all([
        dispatch(makeASandwichWithSecretSauce('Me')),
        dispatch(makeASandwichWithSecretSauce('My wife'))
      ])
    ).then(() =>
      dispatch(makeASandwichWithSecretSauce('Our Kids'))
    ).then(() =>
      dispatch(getState().myMoney > 42 ?
        withdrawMoney(42) :
        apologize('Me','The Sandwich Shop')
      )
    )

  }
}

```

## bindActionCreators


## compose
