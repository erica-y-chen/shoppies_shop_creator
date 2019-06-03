import { Meteor } from 'meteor/meteor';
import Products from '/imports/api/products';

function insertProduct(title, url) {
  Products.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {
  // If the Products collection is empty, add some data.
  if (Products.find().count() === 0) {
    insertProduct(
      'Do the Tutorial',
      'https://www.meteor.com/tutorials/react/creating-an-app'
    );

    insertProduct(
      'Follow the Guide',
      'http://guide.meteor.com'
    );

    insertProduct(
      'Read the Docs',
      'https://docs.meteor.com'
    );

    insertProduct(
      'Discussions',
      'https://forums.meteor.com'
    );
  }
});
