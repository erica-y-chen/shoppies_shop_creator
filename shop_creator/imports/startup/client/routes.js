import React, { Component } from 'react'
import { Redirect, Router, Route, Switch } from 'react-router'
import { AccountsReactComponent } from 'meteor/meteoreact:accounts'
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

// route components
import App from '/imports/ui/containers/App.jsx'

export const renderRoutes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route exact path="/sign-in" component={arState} />
      <Route exact path='/sign-up' component={arState} />
      <Route exact path='/forgot-password' component={arState} />
      <Route exact path='/change-password' component={arState} />
      <Route exact path='/reset-password/:token' component={arState} />
      <Route exact path='/resend-verification' component={arState} />
    </Switch>
  </Router>
);