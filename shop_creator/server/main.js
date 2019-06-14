import { Meteor } from 'meteor/meteor';
import { AccountsReact } from 'meteor/meteoreact:accounts'
import Products from '/imports/api/products';

Meteor.startup(() => {
  // Run on server start
  Meteor.settings.public.location_data = HTTP.get("http://api.ipstack.com/73.93.153.19?access_key=9de99879d6feaab369e4bc7e8e466263");
  AccountsReact.configure({defaultState: 'signUp'});
  // e.g. Migrations go here
});
