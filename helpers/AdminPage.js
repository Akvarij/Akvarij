const PageHelper = require('./PageHelper');

module.exports = class AdminPage {
  constructor(window) {
    this.window = window;
    this.pageHelper = new PageHelper(window);
  }

  async logInClick() {
    const element = '#meta-2 li a';
    await this.pageHelper.waitForClickable(element);
  }

  async enterUserName() {
    const element = '#user_login';
    await this.pageHelper.typeText(element, 'Akvarij');
  }

  async enterPassword() {
    const element = '#user_pass';
    await this.pageHelper.typeText(element, 'akvarij');
  }

  async submitClick() {
    const element = '[type = submit]';
    await this.pageHelper.waitForClickable(element);
  }

  async logIn() {
    await this.window.waitFor(500);
    await this.enterUserName();
    await this.window.waitFor(500);
    await this.enterPassword();
    await this.window.waitFor(500);
    await this.submitClick();
  }

  async postsClick() {
    const element = '#menu-posts';
    await this.pageHelper.waitForClickable(element);
  }
  //To sort them from newest to oldest
  async dateClick() {
    const element = '#date a';
    await this.pageHelper.waitForClickable(element);
  }

  async readNewestPostAdmin() {
    const element = '#the-list tr a';
    return await this.pageHelper.readText(element);
  }

  async goToSite() {
    const element = '#wp-admin-bar-site-name';
    await this.pageHelper.waitForClickable(element);
  }

  async readLatestPost() {
    const element = '.entry-title a';
    return await this.pageHelper.readText(element);
  }
};
