import { Meteor } from 'meteor/meteor';
import { AccountsReact } from 'meteor/meteoreact:accounts'
import Products from '/imports/api/products';

Meteor.startup(() => {
  // Run on server start
  AccountsReact.configure({defaultState: 'signUp'});
  // e.g. Migrations go here
});
