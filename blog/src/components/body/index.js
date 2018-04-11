import React, { Component } from 'react'
export default class Body extends Component {
  render() {
    return (
      <div className={'page-body '+this.props.className}>
        <div className="body-content">{this.props.children}</div>
        <div className="body-sider">{this.props.sider}</div>
      </div>
    )
  }
}
