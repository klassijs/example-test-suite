const { takeImage, compareImage } = require('klassijs-visual-validation');
const { a11yValidator } = require('klassijs-a11y-validator');
const { softAssert } = require('klassijs-soft-assert');
const { extractTextFromImage } = require('klassijs-smart-ocr');

let image;
let elem;

class search {
  /**
   * enters a search term into duckduckgo's search box and presses enter
   * @param {string} searchWord
   * @returns {Promise} a promise to enter the search values
   */
  async performWebSearch(searchWord){
    image = searchWord;
    await browser.$(sharedObjects.searchData.elem.messageBox); // this is the xPath check point
    elem = await browser.$(sharedObjects.searchData.elem.searchInput);

    /** This takes an image of an element on a page */
    await a11yValidator(`SearchPage1-${searchWord}`);
    await takeImage(`${image}_inputBox.png`, sharedObjects.searchData.elem.searchInput, null);
    await browser.pause(DELAY_1s);
    /** This takes an image of the whole page */
    await takeImage(`${image}_1-0.png`);
    await compareImage(`${image}_inputBox.png`);
    await compareImage(`${image}_1-0.png`);
    //
    // /** This reads the text on an image */
    await extractTextFromImage(`${image}_1-0.png`);
    await elem.addValue(searchWord);
    await browser.pause(DELAY_100ms);
    // /** Accessibility verification */
    await a11yValidator(`SearchPage2-${searchWord}`);
    await takeImage(`${image}_1-1.png`, null, sharedObjects.searchData.elem.leftBadge);
    const title = await browser.getTitle();
    console.log('checking what title being returned:- ================> ', title);
    await browser.pause(DELAY_1s);
    await softAssert(title, 'tohavetext', 'our prioritys');
    await softAssert(title, 'tohavetext', 'Peace of mind 12');
    await compareImage(`${image}_1-1.png`);
    await extractTextFromImage(`${image}_1-1.png`);
    await browser.keys('\uE007');
    await browser.pause(DELAY_1s);
  }

  async searchResult(searchWord){
    image = searchWord;
    /** return the promise of an element to the following then */
    await a11yValidator(`SearchPage3-${searchWord}`);
    elem = await browser.$(sharedObjects.searchData.elem.resultLink);
    await takeImage(`${image}-results_1-2.png`, null, sharedObjects.searchData.elem.leftBadge);
    await browser.pause(DELAY_1s);
    /** Accessibility verification */
    await a11yValidator(`SearchPage4-${searchWord}`, true);
    /** verify this element has children */
    await compareImage(`${image}-results_1-2.png`);
    console.log('checking what elem.length is ================> ', elem.elementId);
    await softAssert(elem.elementId,'equal', null );
    await softAssert(elem.elementId,'toNotEqual', null );
    await browser.pause(DELAY_1s);
    await elem.click()
  }
}

module.exports = new search();
