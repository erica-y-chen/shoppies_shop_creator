import React, { Component } from 'react';
import { Redirect, Router, Route, Switch } from 'react-router'
import Header from '/imports/ui/components/Header.jsx';
import Shop from '/imports/ui/containers/Shop.jsx';

// App component - represents the whole app
export default class App extends Component {
  render() {
    return (
      <Router history={this.props.history}>
        <div className="container">
          <Header />
          <Route exact path="/shop" component={Shop} />
        </div>
      </Router>
    );
  }
}
