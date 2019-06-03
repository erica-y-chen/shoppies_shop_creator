import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Products from '../api/products';

class Info extends Component {
  render() {
    const links = this.props.links.map(
      link => this.makeProduct(product)
    );

    return (
      <div>
        <h2>Learn Meteor!</h2>
        <ul>{ products }</ul>
      </div>
    );
  }

  makeLink(link) {
    return (
      <li key={product._id}>
        <a href={product.url} target="_blank">{product.title}</a>
      </li>
    );
  }
}

export default InfoContainer = withTracker(() => {
  return {
    links: Products.find().fetch(),
  };
})(Info);
