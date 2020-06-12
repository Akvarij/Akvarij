const PageHelper = require('../helpers/PageHelper');

module.exports = class HomePage {
  constructor(window) {
    this.window = window;
    this.pageHelper = new PageHelper(window);
  }

  async getTitle() {
    const element = '.site-title';
    return await this.pageHelper.readText(element);
  }

  async getCategoriesTitle() {
    const element = '#categories-2 h2';
    return await this.pageHelper.readText(element);
  }

  async getDevelopmentTitle() {
    const element = '.cat-item-2';
    return await this.pageHelper.readText(element);
  }

  async getForbesTitle() {
    const element = '.cat-item-4';
    return await this.pageHelper.readText(element);
  }

  async getJavaScriptTitle() {
    const element = '.cat-item-3';
    return await this.pageHelper.readText(element);
  }

  async getUncategorizedTitle() {
    const element = '.cat-item-1';
    return await this.pageHelper.readText(element);
  }

  async developmentClick() {
    const element = '.cat-item-2 a';
    await this.pageHelper.waitForClickable(element);
  }

  async forbesClick() {
    const element = '.cat-item-4 a';
    await this.pageHelper.waitForClickable(element);
  }

  async javaScriptClick() {
    const element = '.cat-item-3 a';
    await this.pageHelper.waitForClickable(element);
  }

  async uncategorizedClick() {
    const element = '.cat-item-1 a';
    await this.pageHelper.waitForClickable(element);
  }

  async getPageTitle() {
    const element = '.page-title';
    return await this.pageHelper.readText(element);
  }

  async blogClick() {
    const element = '.entry-title a';
    await this.pageHelper.waitForClickable(element);
  }

  async checkBlogsCategory() {
    const element = '.cat-links a';
    return await this.pageHelper.readText(element);
  }

  async comment() {
    const element = '#comment';
    await this.pageHelper.typeText(element, 'Akvarij rules');
  }

  async submit() {
    const element = '#submit';
    await this.pageHelper.waitForClickable(element);
  }

  async writeAComment() {
    await this.comment();
    await this.submit();
  }

  async checkComment() {
    const element = '.comment-list li';
    await this.pageHelper.findElement(element);
  }
};
