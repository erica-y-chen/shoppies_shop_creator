import React, { Component } from 'react';

import Product from './Product.jsx';

// import Hello from './Hello.jsx';
// import Catalog from './Catalog.jsx';
// <Hello />
// <Info />

// App component - represents the whole app
export default class App extends Component {
  getProducts() {
    return [
      { _id: 1, text: 'This is product 1' },
      { _id: 2, text: 'This is product 2' },
      { _id: 3, text: 'This is product 3' },
    ];
  }

  renderProducts() {
    return this.getProducts().map((product) => (
      <Product key={product._id} product={product} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Welcome to Shoppies!</h1>
        </header>

        <ul>
          {this.renderProducts()}
        </ul>
      </div>
    );
  }
}


