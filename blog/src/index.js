import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './router/Index'
import { Provider } from 'react-redux'
import configureStore from './redux/store/Index'
import './styles/index.scss'

const store = configureStore()
ReactDOM.render((
  <Provider store={store}>
    <AppRouter/>
  </Provider>
), document.getElementById('root'))
