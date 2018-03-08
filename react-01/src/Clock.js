import React, {Component} from 'react';

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
    console.log('into constructor!')
  }

  componentDidMount () {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    console.log('into componentDidMount');
  }

  componentWillMount() {
    clearInterval(this.timerID);
    console.log('into componentWillMount');
  }

  componentWillReceiveProps() {
    console.log('into componentWillReceiveProps');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('into shouldComponentUpdate');
    return this.props.name !== nextProps.name || this.state.date !== nextState.date;
  }

  componentWillUpdate() {
    console.log('into componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('into componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('into componentWillUnmount');
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    console.log('into render');
    return (
      <div>
        <h1>{this.props.name}</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
