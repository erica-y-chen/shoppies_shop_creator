import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Product from './Product.jsx';
import Catalog from './Catalog.jsx';

// App component - represents the whole app
export default class App extends Component {
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
      <div className="container">
        <header>
          <img id="hashtag-shoppies" />
          <h1>Empowering content creators to own their own brand</h1>
        </header>
        <Catalog />
        <form className="new-product" onSubmit={this.handleSubmit.bind(this)} >
          <input
            type="text"
            ref="textInput"
            placeholder="Type to add new products"
          />
        </form>
      </div>
    );
  }
}
