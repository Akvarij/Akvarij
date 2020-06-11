module.exports = class PageHelper {
  constructor(window) {
    this.window = window;
  }

  async findElement(element, timeout = 15000, visible = true) {
    return await this.window.waitForSelector(element, {
      timeout: timeout,
      visible: visible
    });
  }

  async typeText(elSelector, input, timeout = 15000, visible = true) {
    const element = await this.findElement(elSelector, timeout, visible);
    await element.type(input);
  }

  async readText(elSelector, timeout = 15000, visible = true) {
    const element = elSelector;
    await this.findElement(element, timeout, visible);
    return this.window.$eval(element, e => e.innerHTML);
  }

  async waitForElement(elSelector) {
    await this.window.waitForFunction(
      element => !document.querySelector(element),
      {},
      elSelector
    );
  }

  async waitForClickable(element, timeout = 2000, visible = true) {
    const clickButton = async (retries = 5) => {
      return this.findElement(element, timeout, visible)
        .then(() => this.window.click(element))
        .catch(err => {
          const num_of_retries = 6 - retries;
          console.log('Retry error: ' + num_of_retries, err);
          if (retries <= 0) {
            throw err;
          }
          console.log('Fire retry!');

          return this.window.waitFor(1000).then(() => clickButton(retries - 1));
        });
    };
    return await clickButton();
  }
};
