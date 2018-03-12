import React from 'react';
export default class RefDomApp extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
  }

  focus() {
    //直接使用原生 API 使 text 输入框获得焦点
    this.textInput.focus();
  }

  render() {
    return (
      <div>
        <input type="text"
          ref={(input) => {this.textInput = input; }}/>
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focus}
        />
      </div>
    );
  }
}
