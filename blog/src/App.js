import React, { useEffect } from 'react'
import Header from './components/header'
import Footer from './components/footer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getUserInfo } from './redux/actions'
import { useSection } from '@/effects/sections'

const App = props => {
  useEffect(() => {
    if (!props.user.logged) {
      props.dispatch(getUserInfo())
    }
  })
  const { sections } = useSection()
  return (
    <React.Fragment>
      <Header user={props.user} activePath={props.match.path} sections={sections} config={props.config} />
      <div key='content' className="page-content main-content">
        {props.children}
      </div>
      <Footer />
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const { user, config } = state
  return {
    user,
    config
  }
}

export default withRouter(connect(mapStateToProps)(App))