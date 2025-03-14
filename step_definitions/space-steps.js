const space = require('../page-objects/space');

Given(/^The user is on the search page$/, async () => {
  await helpers.loadPage(env.base_url, 10);
});

When(/^they enter a (.*)$/, async (searchWord) => {
  /** use a method on the page object which also returns a promise */
  await space.performWebSearch(searchWord);
});

Then(/^they should see a list of results (.*)$/, async (searchWord) => {
  /** return the promise of an element to the following then */
  await space.searchResult(searchWord);
});