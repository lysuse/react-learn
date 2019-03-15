import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Loadable from 'react-loadable'

import App from '../App'
import Home from '@/view/home'
import Login from '@/view/login'
import ArticleDetail from '@/view/article/detail'
import ArticleList from '@/view/article/list'
// import Admin from '@/view/admin'
import About from '@/view/about'
import { Spin } from 'antd'

const AsyncAdmin = Loadable({
  loader: () => import('@/view/admin'),
  loading: Spin
});

export default class AppRouter extends React.Component {
  render() {
    return (<div className="router">
      <Router>
        <App>
          <Route exact={true} path='/' component={Home}/>
          <Route path='/login' component={Login}/>
          <Route exact={true} path='/articles/:rid' component={ArticleList}/>
          <Route exact={true} path='/articles/:rid/:sid' component={ArticleList}/>
          <Route exact={true} path='/article/:rid/:sid/:id' component={ArticleDetail}/>
          <Route path='/admin/:tabName' component={AsyncAdmin}/>
          <Route path='/about' component={About}/>
        </App>
      </Router>
    </div>)
  }
}
