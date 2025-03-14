const { a11yValidator } = require('klassijs-a11y-validator');

let elem;

class accessibility{
  /**
   * enters a search term into duckduckgo's search box and presses enter
   * @param {string} searchWord
   * @returns {Promise} a promise to enter the search values
   */
  async performWebSearch(searchWord) {
    elem = await browser.$(sharedObjects.searchData.elem.searchInput);
    await a11yValidator(`SearchPage1-${searchWord}`);
    await browser.pause(DELAY_1s);
    // await elem.addValue(searchWord);
    await elem.setValue(searchWord);
    await browser.pause(DELAY_100ms);
    await a11yValidator(`SearchPage2-${searchWord}`);
    const title = await browser.getTitle();
    console.log('checking what title being returned:- ================> ', title);
    await browser.pause(DELAY_1s);
    await browser.keys('\uE007');
    await browser.pause(DELAY_1s);
  }

  async searchResult(searchWord) {
    /** return the promise of an element to the following then */
    await a11yValidator(`SearchPage3-${searchWord}`);
    elem = await browser.$(sharedObjects.searchData.elem.resultLink);
    await browser.pause(DELAY_1s);
    await a11yValidator(`SearchPage4-${searchWord}`, true);
    console.log('checking what elem.length is ================> ', elem.elementId);
    await browser.pause(DELAY_1s);
    await elem.click()
  }
}

module.exports = new accessibility();
