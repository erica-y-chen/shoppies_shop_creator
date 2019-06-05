import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Products from '/imports/api/products.js';
import Product from '/imports/ui/components/Product.jsx'

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
      <Product key={product._id} product={product}/>
    );
  }
}

export default Catalog = withTracker(() => {
  return {
    products: Products.find().fetch(),
  };
})(Catalog);
