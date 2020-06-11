const puppeteer = require('puppeteer');
const { expect } = require('chai');
const _ = require('lodash');
const globalVariables = _.pick(global, [
  'browser',
  'expect',
  'joanDeviceName',
  'joanDevicePage',
  'API_HOST',
  'ENV',
  'screenshotsEnabled'
]);

// puppeteer options
const opts = {
  headless: false, //false,
  args: [
    '--enable-automation',
    // Required for Docker version of Puppeteer
    '--no-sandbox',
    '--disable-setuid-sandbox',
    // This will write shared memory files into /tmp instead of /dev/shm,
    // because Docker ^`^ys default for /dev/shm is 64MB
    '--disable-dev-shm-usage',
    '--disable-gpu'
  ],
  timeout: 10000
};

const setup = async function () {
  (global.expect = expect),
    (global.browser = await puppeteer.launch(opts)),
    (global.joanDeviceName = 'something_default'),
    (global.joanDevicePage = 'stub'),
    (global.ENV = 'DEVELOP'), //'DEVELOP' //'STAG', 'LOCAL' //'DOCKER'//'STAG'//'DEV'
    (global.screenshotsEnabled = true);
  // global.page = await browser.newPage();
};

// expose variables
before(setup);

// close browser and reset global variables
after(function () {
  console.log('after');
  global.browser.close();
  global.browser = globalVariables.browser;
  global.expect = globalVariables.expect;
  global.joanDeviceName = globalVariables.joanDeviceName;
  global.joanDevicePage = globalVariables.joanDevicePage;
  global.ENV = globalVariables.ENV;
  global.screenshotsEnabled = globalVariables.screenshotsEnabled;
});
