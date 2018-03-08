import React, { Component } from 'react';
import './UserCard.css';

export default class UserCard extends Component {
  render() {
    return (
      <div className="user-card">
        <div className="card-left">
          <img src={this.props.avatarUrl} alt={this.props.nickname} className="avatar" />
        </div>
        <div className="card-right">
          <h2>{this.props.nickname}</h2>
          <p>{this.props.resume}</p>
          <a href={this.props.githubUrl}>GitHub</a>
        </div>
      </div>
    );
  }
}
