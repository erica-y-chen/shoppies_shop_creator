import { Meteor } from 'meteor/meteor';
import { AccountsReact } from 'meteor/day:accounts-react'
import Products from '/imports/api/products';

Meteor.startup(() => {
  // Run on server start
  AccountsReact.configure(
      {
        defaultState: 'signUp',
        logUserMetaData: true
      }
  );
  // e.g. Migrations go here
});
