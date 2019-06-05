import React, { Component } from 'react';

// ProductForm component - add a new product
export default class ProductForm extends Component {
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const title = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Products.insert({
      title,
      url: "#"
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
  render() {
    return (
      <form className="new-product" onSubmit={this.handleSubmit.bind(this)} >
        <input
          type="text"
          ref="textInput"
          placeholder="Type to add new products"
        />
      </form>
    );
  }
}