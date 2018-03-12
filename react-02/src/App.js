import React, { Component } from 'react';
import BlueDatePicker from './Jsx';
import PropTypeApp from './PropTypeApp';
import RefDomApp from './RefDomApp';

import './App.css';


function Pannel(props) {
  return (
    <div className="pannel">
      <div className="pannel-header" onClick={e => {props.clickHeader(props.index)}}>
        <h3>{props.title} <em>{props.showBody?'折叠':'展开'}</em></h3>
      </div>
      <div className="pannel-body" style={{display:(props.showBody?'block':'none')}}>
        {props.children}
      </div>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex : 0,
      total: 10
    };
    this.handleHeaderClick = this.handleHeaderClick.bind(this);
  }

  handleHeaderClick(index) {
    if(index === this.state.activeIndex) {
      this.setState({
        activeIndex:-1
      });
    } else {
      this.setState({
        activeIndex:index
      });
    }
  }

  render() {
    return (
      <div className="App">
        <h2>React高级指引</h2>
        <Pannel title="JSX" index={0} clickHeader={this.handleHeaderClick} showBody={this.state.activeIndex===0}>
          <BlueDatePicker />
        </Pannel>
        <Pannel title="PropTypes" index={1} clickHeader={this.handleHeaderClick} showBody={this.state.activeIndex===1}>
          <PropTypeApp name="GitHub">
            <p>this is element in children!</p>
          </PropTypeApp>
        </Pannel>
        <Pannel title="Ref & DOM" index={2} clickHeader={this.handleHeaderClick} showBody={this.state.activeIndex===2}>
          <RefDomApp />
        </Pannel>
      </div>
    );
  }
}

export default App;
