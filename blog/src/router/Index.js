import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import App from '../App'
import Home from '@/view/home'
import Login from '@/view/login'
import ArticleDetail from '@/view/article/detail'

export default class AppRouter extends React.Component {
  render() {
    return (<div className="router">
      <Router>
        <App>
          <Route exact={true} path='/' component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/article/:rid/:sid/:id' component={ArticleDetail}/>
        </App>
      </Router>
    </div>)
  }
}
