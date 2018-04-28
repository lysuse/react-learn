import { combineReducers } from 'redux'
import {
  REQUEST_NAVS, REQUEST_ARTICLE, RECEIVE_ARTICLE, RECEIVE_ARTICLE_DETAIL
} from '../actions'

const initUser = {
  logged: false,
  id: '',
  username: '',
  avatar: ''
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

const user = (state = initUser, action) => {
  return state
}


const blog = (state = initBlog, action) => {
  switch (action.type) {
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
  user
})
