import React from 'react';

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('A name was submitted: '+ this.input.value + ', file: '+ this.fileInput.files[0].name);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(input) => this.input = input} />
        </label>
        <label>
          File:
          <input
            defaultValue="Bob"
            type="file"
            ref={(input) => this.fileInput = input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }

}
