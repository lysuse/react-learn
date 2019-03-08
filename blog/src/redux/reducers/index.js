import { combineReducers } from 'redux'
import {
  SET_USER_INFO, REQUEST_ARTICLE, RECEIVE_ARTICLE, RECEIVE_ARTICLE_DETAIL
} from '../actions'

const initUser = {
  logged: false
}

const initBlog = {
  detail: {},
  page: {
    params:{},
    page: 2,
    pageSize: 5,
    total: 10,
    loadedAll: false,
    loading: false,
    datas: []
  }
}

const initConfig = {
  menus: ['个人资料', '栏目管理', '文章管理', '标签管理', '滚图管理', '每日名言'],
  menuCodes: ['profile', 'menuManage', 'articleManage', 'tagManage', 'bannerManage', 'dayQuote']
}

const user = (state = initUser, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return Object.assign({ logged: !!action.payload}, action.payload)
    default:
      return state
  }
  return state
}

const config = (state = initConfig, action) => {
  return state
}


const blog = (state = initBlog, action) => {
  switch (action.type) {
    case REQUEST_ARTICLE:
      return {
        detail: state.detail,
        page: Object.assign({}, state.page, {loading: true})
      }
    case RECEIVE_ARTICLE:
      return {
        detail: action.detail,
        page: action.page
      }
    case RECEIVE_ARTICLE_DETAIL:
      return {
        detail: action.detail,
        page: state.page
      }
    default:
      return state
  }
}


export default combineReducers({
  blog,
  user,
  config
})
