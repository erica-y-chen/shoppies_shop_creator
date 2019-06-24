import { Meteor } from 'meteor/meteor';
import { AccountsReact } from 'meteor/day:accounts-react'
import Products from '/imports/api/products';

Meteor.startup(() => {
  // Run on server start
  Meteor.methods({
      getFileStackAPIKey: function () {
          if (Meteor.settings.fileStackAPIKey) {
              console.log(Meteor.settings.fileStackAPIKey)
              return Meteor.settings.fileStackAPIKey
          }
          else {
              return {message: "Configure Meteor.settings.fileStackAPIKey to connect to FileStack."}
          }
      }
  });
  AccountsReact.configure(
      {
        defaultState: 'signUp',
        logUserMetaData: true
      }
  );
  // e.g. Migrations go here
});
