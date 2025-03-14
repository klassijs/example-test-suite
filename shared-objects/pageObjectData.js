const ocr = require('../page-objects/ocr');
const assertion = require('../page-objects/assertion');
const search = require('../page-objects/search');
const visualValidation = require('../page-objects/visualValidation');
const accessibility = require('../page-objects/accessibility');

const pageObjectMap = {
  '@ocr': ocr,
  '@search': search,
  '@assert': assertion,
  '@a11y': accessibility,
  '@visual': visualValidation
};

module.exports = pageObjectMap;
