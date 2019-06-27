import React, { Component } from 'react';

import Catalog from '/imports/ui/containers/Catalog.jsx';
import ProductForm from '/imports/ui/components/ProductForm.jsx';

export default class Shop extends Component {
  render() {
    return (
      <div id="shop">
        <Catalog />
        <ProductForm />
      </div>
    );
  }
}
