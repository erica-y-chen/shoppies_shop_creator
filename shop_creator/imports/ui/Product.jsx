import React, { Component } from 'react';

// Product component - represents a single product
export default class Product extends Component {
  render() {
    return (
      <li>
        <a href={this.props.product.url} target="_blank">{this.props.product.title}</a>
      </li>
    );
  }
}