import React,{Component} from 'react';
import wrapWithUsername from './wrapWithUsername';

class Welcome2 extends Component {
  render() {
    return (<div>welcome {this.props.username}</div>)
  }
}

Welcome2 = wrapWithUsername(Welcome2);

export default Welcome2;
