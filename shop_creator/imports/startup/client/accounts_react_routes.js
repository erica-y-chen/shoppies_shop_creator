import React, { Component } from 'react'
import { Redirect, Router, Route, Switch } from 'react-router'
import { AccountsReactComponent } from 'meteor/day:accounts-react'

arState = ({ match, history }) => {
  const { path, params } = match

  // Can't change password if not logged in.
  if (path === '/change-password' && !Meteor.userId()) {
    return (<Redirect to='/' />)
  }

  return (
      <AccountsReactComponent
  history={history}
  route={path}
  token={params.token} // for the reset-password route
/>
)
}

export const AccountsReactRoutes = (history) => (
  <Router history={history}>
    <Switch>
      <Route exact path="/sign-in" component={arState} />
      <Route exact path='/sign-up' component={arState} />
      <Route exact path='/forgot-password' component={arState} />
      <Route exact path='/change-password' component={arState} />
      <Route exact path='/reset-password/:token' component={arState} />
      <Route exact path='/resend-verification' component={arState} />
    </Switch>
  </Router>
);