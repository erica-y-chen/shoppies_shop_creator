import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Catalog from '/imports/ui/containers/Catalog.jsx';
import ProductForm from '/imports/ui/components/ProductForm.jsx';

// App component - represents the whole app
export default class App extends Component {
  render() {
    return (
      <div className="container">
        <header>
          <img id="hashtag-shoppies" />
          <h1>Empowering content creators to own their own brand</h1>
        </header>
        <Catalog />
        <ProductForm />
      </div>
    );
  }
}
