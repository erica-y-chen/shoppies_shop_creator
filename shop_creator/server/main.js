import { Meteor } from 'meteor/meteor';
import { AccountsReact } from 'meteor/day:accounts-react'
import Products from '/imports/api/products';

Meteor.startup(() => {
    // Insecure until I can find a better way; likely forking the module.
    // In the meantime at least the key is not in the repo
    Meteor.settings.public.googleWebFontsAPIKey = Meteor.settings.googleWebFontsAPIKey;

    // Secure server-side methods
    Meteor.methods({
        getFileStackAPIKey: function () {
            if (Meteor.settings.fileStackAPIKey) {
                return Meteor.settings.fileStackAPIKey
            }
            else {
                return {message: "Configure Meteor.settings.fileStackAPIKey to connect to FileStack."}
            }
        },
      getGoogleWebFontsAPIKey: function () {
          if (Meteor.settings.googleWebFontsAPIKey) {
              return Meteor.settings.googleWebFontsAPIKey
          }
          else {
              return {message: "Configure Meteor.settings.googleWebFontsAPIKey to connect to Google Web Fonts."}
          }
      }
    });

    // Configure the AccountsReact module
    AccountsReact.configure(
        {
          defaultState: 'signUp',
          logUserMetaData: true
        }
    );

    // Eventually, migrations will go here
});
