import React, { Component } from 'react'
import Header from './components/header'
import Footer from './components/footer'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header/>
          <div key='content' className="page-content main-content">
            {this.props.children}
          </div>
        <Footer/>
      </div>
    )
  }
}
