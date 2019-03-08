import React, { Component } from 'react'
import Header from './components/header'
import Footer from './components/footer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getUserInfo } from './redux/actions';

class App extends Component {

  componentWillMount() {
    if (!this.props.user.logged) {
      this.props.dispatch(getUserInfo())
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header user={this.props.user} config={this.props.config}/>
          <div key='content' className="page-content main-content">
            {this.props.children}
          </div>
        <Footer/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { user, config } = state
  return {
    user,
    config
  }
}

export default withRouter(connect(mapStateToProps)(App))