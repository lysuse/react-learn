import { combineReducers } from 'redux'
import {
  REQUEST_NAVS, REQUEST_ARTICLE
} from '../actions'

const navs = (state = [], action) => {
  return state
}

const rootReducer = combineReducers({
  navs
})

export default rootReducer
