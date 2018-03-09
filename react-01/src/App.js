import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Welcome from './Welcome';
import UserCard from './UserCard';
import Clock from './Clock';
import Form from './Form';
import Reservation from './Reservation';

//函数式定义组件
function TimeClock(props) {
  if(!props.onlyTime) {
    return (<h2>It is {new Date().toLocaleString()}.</h2>)
  } else {
    return (<h2>It is {new Date().toLocaleTimeString()}.</h2>)
  }
}

function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">Welcome</h1>
      <p className="Diialog-message">
        Tank you for visiting my GitHub!
      </p>
    </FancyBorder>
  );
}


class App extends Component {
  constructor(props) {
      super(props);
      this.state = {date: new Date(),showClock:true};
  }
  renderClock() {
    if(this.state.showClock) {
      return (<Clock name="GitHub Clock" />);
    }
    return '';
  }

  switchClock() {
    this.setState({
      showClock: !this.state.showClock
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <Welcome name="GitHub" />
          <Welcome name="Infoq" />
          <Welcome name="Facebook" />
        </div>
        <TimeClock onlyTime="true" />
        {this.renderClock()}
        <UserCard
          avatarUrl="https://avatars0.githubusercontent.com/u/7472089?s=460&v=4"
          nickname="YoungStream"
          resume="Java,web,front developer"
          githubUrl="https://github.com/lysuse" />
        <button type="button" onClick={() => {this.switchClock()}} className="go-btn">Switch Clock!</button>

        <Form />
        <Reservation />

        <WelcomeDialog />
      </div>
    );
  }
}

export default App;
