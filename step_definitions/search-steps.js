Given(/^The user arrives on the duckduckgo search page$/, async () => {
  await helpers.loadPage(env.base_url, 10);
});

When(/^they input (.*)$/, async (searchWord) => {
  /** use a method on the page object which also returns a promise */
  await pageObjects.search.performWebSearch(searchWord);
});

Then(/^they should see some results (.*)$/, async (searchWord) => {
  /** return the promise of an element to the following then */
  await pageObjects.search.searchResult(searchWord);
});
