import React, { Component } from 'react';

// Task component - represents a single todo item
export default class Product extends Component {
  render() {
    return (
      <li>{this.props.product.text}</li>
    );
  }
}