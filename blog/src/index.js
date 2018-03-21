import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'

import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import App from './containers/App'

import './styles/index.scss'

const middleware = [ thunk ]
if(process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}
const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <Route path='/'component={App}>
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))
