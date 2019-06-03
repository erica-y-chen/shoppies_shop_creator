import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Products from '../api/products.js';

class Catalog extends Component {
  render() {
    const products = this.props.products.map(
      product => this.makeProduct(product)
    );

    return (
      <div>
        <ul>{ products }</ul>
      </div>
    );
  }

  makeProduct(product) {
    return (
      <li key={product._id}>
        <a href={product.url} target="_blank">{product.title}</a>
      </li>
    );
  }
}

export default ProductContainer = withTracker(() => {
  return {
    products: Products.find().fetch(),
  };
})(Catalog);
