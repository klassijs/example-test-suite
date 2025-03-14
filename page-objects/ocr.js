const { extractTextFromImage } = require('klassijs-smart-ocr');
const { takeImage } = require('klassijs-visual-validation');

let image;
let elem;

class ocr {
  /**
   * enters a search term into duckduckgo's search box and presses enter
   * @param {string} searchWord
   * @returns {Promise} a promise to enter the search values
   */
  async performWebSearch(searchWord) {
    image = searchWord;
    elem = await browser.$(sharedObjects.searchData.elem.searchInput);
    await takeImage(`${image}_inputBox.png`, sharedObjects.searchData.elem.searchInput, null);
    await takeImage(`${image}_1-0.png`);
    await extractTextFromImage(`${image}_1-0.png`);
    await elem.addValue(searchWord);
    // await browser.keys(searchWord);
    await browser.pause(DELAY_100ms);
    await takeImage(`${image}_1-1.png`, null, sharedObjects.searchData.elem.leftBadge);
    await extractTextFromImage(`${image}_1-1.png`);
    await browser.keys('\uE007');
    await browser.pause(DELAY_1s);
  }

  async searchResult(searchWord) {
    image = searchWord;
    elem = await browser.$(sharedObjects.searchData.elem.resultLink);
    await takeImage(`${image}-results_1-2.png`, null, sharedObjects.searchData.elem.leftBadge);
    await extractTextFromImage(`${image}-results_1-2.png`);
    await browser.pause(DELAY_1s);
    await elem.click()
  }
}

module.exports = new ocr();
