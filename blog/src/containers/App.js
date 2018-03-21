import React, { Component } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import { connect } from 'react-redux'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      contentHeight: 500
    }
  }

  render() {
    return [
      <Header key='header' navs={this.props.navs} user={this.props.user} />,
      <div key='content' className="page-content main-content" style={{minHeight:this.state.contentHeight+'px'}}></div>,
      <Footer key='footer' />
    ]
  }

  componentDidMount() {
    this.setState({
      contentHeight: document.documentElement.clientHeight - 190 || 500
    })
  }
}

const mapStateToProps = state => {
  const { navs, user } = state
  return {
    navs: navs.length ? navs : [{path:'/', title: '首页'},{path: '/about', title: '关于'}, {path: '/tags', title: '标签'}],
    user: user || {isLogged: false}
  }
}

export default connect(mapStateToProps)(App)
