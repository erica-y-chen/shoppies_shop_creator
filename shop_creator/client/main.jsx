import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, Redirect } from 'react-router';

// Semantic UI Styles
import "./lib/semantic-ui/semantic.less";

// Accounts React
import { AccountsReactConfig } from '/imports/startup/client/accounts_react_config.js';
import { AccountsReactRoutes } from '/imports/startup/client/accounts_react_routes.js';

// Browser History
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

// Application
import App from '/imports/ui/containers/App.jsx'

// Client Entry Point
Meteor.startup(() => {
  AccountsReactConfig();
  render(<App history={history} />, document.getElementById('main-react-target'));
  render(AccountsReactRoutes(history), document.getElementById('accounts-react-target'));
});
