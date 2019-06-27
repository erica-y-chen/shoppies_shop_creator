import React, { Component } from 'react';
import { Redirect, Router, Route, Switch } from 'react-router'
import Header from '/imports/ui/components/Header.jsx';
import Brand from '/imports/ui/containers/Brand.jsx';

export default class App extends Component {
  render() {
    return (
      <Router history={this.props.history}>
        <div className="container">
          <Header />
          <Route exact path="/brand" component={Brand} />
        </div>
      </Router>
    );
  }
}
