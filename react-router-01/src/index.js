import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

import { BrowserRouter, Route, Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="app">
        <h1>App</h1>
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/inbox">Inbox</Link>
          </li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

const About = () => (
  <h3>About</h3>
)

const Inbox = () => (
  <div>
    <h2>Inbox</h2>
    {this.props.children || 'Welcome to your Inbox'}
  </div>
)

const Message = () => (
  <h3>Message {this.props.params.id}</h3>
)

//进入前可以进行的回调
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}

ReactDOM.render((
  //getUserConfirmation={getConfirmation('Are you ok?', ()=>{})}
  <BrowserRouter >
    <Route path="/" component={App}>
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox}>
        <Route path="messages/:id" component={Message} />
      </Route>
    </Route>
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
