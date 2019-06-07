import React, { Component } from 'react';
import Header from '/imports/ui/components/Header.jsx';

import Catalog from '/imports/ui/containers/Catalog.jsx';
import ProductForm from '/imports/ui/components/ProductForm.jsx';

// App component - represents the whole app
export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Catalog />
        <ProductForm />
      </div>
    );
  }
}
