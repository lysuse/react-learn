import { combineReducers } from 'redux'
import {
  SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'

const selectedSubreddit = (state = 'reactjs', action) => {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receiveAt
      }
    default:
      return state
  }
}

const postsBySubreddit = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.subreddit]: posts(state[action.subreddit], action)
      }
    default:
      return state
  }
}


const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit
})

const reverseTwoNumber =  n => {
  if(n <= 0) {
    throw `n must a positive integer`
  }
  let array = new Array(2*n - 1)
  for(let i = n; i > 0; i --) {
    array[n - i] = i.toString().repeat(i);
    if(i > 1) {
      array[n + i - 1] = i.toString().repeat(i);
    }
  }
  return array
}
console.log(reverseTwoNumber(8))
console.log(reverseTwoNumber(8).join('|').replace(/\|/gi,'\n'))

//ES6 Generator 函数
// 特征: 1. function 关键字与函数名之间有一个星号
//       2. 函数内部使用 yield 表达式，定义不同的内部状态

function* helloWordGenerator() {
  yield 'hello';
  yield 'word';
  return 'ending';
}
//返回的是一个指向内部状态的指针对象（Iterator Object）
var hw = helloWordGenerator();
console.log(hw.next())
//将输出 {value: 'hello', done : false}
console.log(hw.next())
//将输出 {value: 'word', done : false}
console.log(hw.next())
//将输出 {value: 'ending', done : true}
console.log(hw.next())
//将输出 {value: undefined, done : true}

function* gen() {
  yield 123 + 456
}

console.log(gen().next());
// 将输出 {value: 579, done: false}

export default rootReducer
