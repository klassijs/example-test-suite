const { getActivePageObject } = require('klassijs-pageObject-selector');
const pageObjectMap = require('../shared-objects/pageObjectData');

let activePageObject;

Before(() => {
  console.log('activePageObject ========================== 0 :', pageObjectMap);
  activePageObject = getActivePageObject(pageObjectMap);
  console.log('activePageObject ========================== 1 :', activePageObject);
});

Given(/^The user arrives on the duckduckgo search page$/, async () => {
  await helpers.loadPage(env.base_url, 10);
});

When(/^they input (.*)$/, async (searchWord) => {
  if (!activePageObject || !activePageObject.performWebSearch(searchWord)) {
    throw new Error('The active page object does not have a performWebSearch method!');
  }
  await activePageObject.performWebSearch(searchWord);
});

Then(/^they should see some results (.*)$/, async (searchWord) => {
  if (!activePageObject || !activePageObject.searchResult) {
    throw new Error('The active page object does not have a searchResult method!');
  }
  await activePageObject.searchResult(searchWord);
});
