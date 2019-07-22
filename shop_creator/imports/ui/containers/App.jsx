import React, { Component } from 'react';
import { Redirect, Router, Route, Switch } from 'react-router'
import Header from '/imports/ui/components/Header.jsx';
import Brand from '/imports/ui/containers/Brand.jsx';
import SignUpForm from '/imports/ui/components/SignUpForm.jsx';
// import { FilePond, registerPlugin } from "react-filepond";

export default class App extends Component {
  render() {
    return (
      <Router history={this.props.history}>
        <div className="container">
          <Header />
          <SignUpForm /> 
          <Route exact path="/brand" component={Brand} />
        </div>
      </Router>
    );
  }
}
