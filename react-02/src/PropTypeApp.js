import React from 'react';
import PropTypes from 'prop-types';

export default class Greeting extends React.Component {
  render() {
    const children = this.props.children;
    return (
      <div>
      <h1>Hello, {this.props.name}</h1>
      {children}
      </div>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string,
  children: PropTypes.element.isRequired
};
