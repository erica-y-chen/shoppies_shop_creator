import React, { Component } from 'react'
import { Redirect, Router, Route, Switch } from 'react-router'
import { AccountsReactComponent } from 'meteor/day:accounts-react'
import FileStack from '/imports/ui/components/FileStack.jsx'

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
    <Route
      exact path='/sign-up'
      render={(props) =>
        <FileStack
          {...props}
          apiKeyMethod={'getFileStackAPIKey'}
          fieldName={'audienceInsights'}
          componentDisplayMode={{
            type: 'button',
            customText: 'Upload audience insights image',
            customClass: 'ui button'
          }}
          onSuccess={(res, fieldName) => { this.document.getElementById(fieldName + 'Thumbnail').src = res.filesUploaded[0].url }}
        />}
    />
  </Router>
);