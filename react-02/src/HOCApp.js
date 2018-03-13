import React from 'react';


export default class HOCComp extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      companies: props.data
    };
  }

  handleChange() {
    this.setState({
      companies: this.state.companies.reverse()
    });
  }

  render() {
    const listNames = this.state.companies.map((data) => {
      return <div key={data.id} id={'c_'+data.id}>{data.name}</div>
    });
    return (
      <div>
        {listNames}
        <button type="button" onClick={this.handleChange}>Switch</button>
      </div>
    );
  }

}
