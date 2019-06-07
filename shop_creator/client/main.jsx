import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Redirect } from 'react-router';
import { AccountsReact } from 'meteor/meteoreact:accounts'
import { AccountsReactComponent } from 'meteor/meteoreact:accounts'
import "./lib/semantic-ui/semantic.less";

import { renderRoutes } from '/imports/startup/client/routes.js';

Meteor.startup(() => {
  AccountsReact.configure({defaultState: 'signUp'});
  /*
  • Collect required data from potential shop creators, so we can validate if we want them
  • checkbox with T&C (submit not working until it is checked)
  • email, mobile number
  • instagram account (or other social media)
  • screenshot of their insights
  • survey questions
  • submit button that goes to thank you page
  • log all these data to spreadsheet
  • account creation (password)
  • facebook auth, google auth (nice to have but not requried)
  */
  AccountsReact.addFields('signUp', [
    {
      _id: 'someFukkinField',
      displayName: 'Something Wonderous',
      placeholder: 'You need to add this info',
      minLength: 4,
      maxLength: 70,
      required: true,
      errStr: 'This field must contain at least 4 characters and no more than 70',
      autocomplete: 'does this matter?'
    },
    {
      _id: 'someOtherFukkinField',
      displayName: 'Something Else',
      placeholder: 'You need to add this info',
      minLength: 4,
      maxLength: 70,
      required: true,
      errStr: 'This field must contain at least 4 characters and no more than 70',
      autocomplete: 'nothing matters',
      type: 'radio',
      label: 'but why?',
      options: [
        {value: 'yep', text: 'Yes, indeed!'},
        {value: 'maybe', text: 'Not impossible.'},
        {value: 'nope', text: 'Rather not.'}
       ]
    }
  ]);
  arState = ({ match, history }) => {
    const { path, params } = match

    // Cant change password if not logged in.
    if (path == '/change-password' && !Meteor.userId()) {
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
  render(renderRoutes(), document.getElementById('react-target'));
});
