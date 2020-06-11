const HomePage = require('../helpers/HomePage');
const AdminPage = require('../helpers/AdminPage');
const cTxt = require('../Text/Text');

let browserWindow;

const API_HOST = 'http://localhost:8000';
// # Use standard viewport for this
const VIEW_PORT = { width: 1825, height: 1025 };

describe('Open new window and go to Akvarij blog', () => {
  before(async () => {
    browserWindow = await global.browser.newPage();
    await browserWindow.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    );
    await browserWindow.setViewport(VIEW_PORT);
    await browserWindow.goto(API_HOST, { waitUntil: 'networkidle0' });
  });

  it('should have blog name', async function() {
    const homePage = new HomePage(browserWindow);

    const siteTitle = await homePage.getTitle();
    expect(siteTitle).to.contain(cTxt.SITE_TITLE);
    console.log(siteTitle);
  }).timeout(60000);
});

describe('Check if the last post is on the frontpage', () => {
  it('should log in into admin', async function() {
    // # You can register AdminPage in before function. No need to initialize it for every test.
    const adminPage = new AdminPage(browserWindow);

    await adminPage.logInClick();
    await adminPage.logIn();
  }).timeout(15000);

  it('should sort blogs and check if it appears on front page', async function() {
    const adminPage = new AdminPage(browserWindow);

    await adminPage.postsClick();
    await adminPage.dateClick();

    const lastPostAdminName = await adminPage.readNewestPostAdmin();

    await adminPage.goToSite();
    const lastPost = await adminPage.readLatestPost();
    expect(lastPost).to.be.eql(lastPostAdminName);
  }).timeout(25000);
});

describe('Categories', () => {
  it('should check categories', async function() {
    const homePage = new HomePage(browserWindow);

    const categoriesTitle = await homePage.getCategoriesTitle();
    expect(categoriesTitle).to.be.eql(cTxt.CATEGORIES_TITLE);
    console.log(categoriesTitle);
  }).timeout(5000);

  it('should check categories options', async function() {
    const homePage = new HomePage(browserWindow);

    const forbesTitle = await homePage.getForbesTitle();
    expect(forbesTitle).to.contain(cTxt.FORBES_TITLE);
    console.log(forbesTitle);

    const javaScriptTitle = await homePage.getJavaScriptTitle();
    expect(javaScriptTitle).to.contain(cTxt.JAVASCRIPT_TITLE);
    console.log(javaScriptTitle);

    const uncategorizedTitle = await homePage.getUncategorizedTitle();
    expect(uncategorizedTitle).to.contain(cTxt.UNCATEGORIZED_TITLE);
    console.log(uncategorizedTitle);
  }).timeout(20000);
});

describe('Forbes category', () => {
  it('should check Forbes category, if it displays right blogs', async function() {
    const homePage = new HomePage(browserWindow);

    await homePage.forbesClick();

    const pageTitle = await homePage.getPageTitle();
    expect(pageTitle).to.be.eql(cTxt.FORBES_PAGE_TITLE);
    console.log(pageTitle);
  }).timeout(10000);

  it('should check if blog is in right category', async function() {
    const homePage = new HomePage(browserWindow);

    await homePage.blogClick();

    const blogCategory = await homePage.checkBlogsCategory();
    expect(blogCategory).to.be.eql(cTxt.FORBES_TITLE);
    console.log(blogCategory);
  }).timeout(5000);

  it('should write a comment and check it', async function() {
    // # You can register HomePage in before function. No need to initialize it for every test.
    const homePage = new HomePage(browserWindow);

    await homePage.writeAComment();
    await homePage.checkComment();
  }).timeout(10000);
});

describe('JavaScript category', () => {
  it('should check JavaScript category, if it displays right blogs', async function() {
    const homePage = new HomePage(browserWindow);

    await homePage.javaScriptClick();

    const pageTitle = await homePage.getPageTitle();
    expect(pageTitle).to.be.eql(cTxt.JAVASCRIPT_PAGE_TITLE);
    console.log(pageTitle);
  }).timeout(10000);

  it('should check if blog is in right category', async function() {
    const homePage = new HomePage(browserWindow);

    await homePage.blogClick();

    const blogCategory = await homePage.checkBlogsCategory();
    expect(blogCategory).to.be.eql(cTxt.JAVASCRIPT_TITLE);
    console.log(blogCategory);
  }).timeout(5000);
  //No comment's on other blog posts, because it has time limit on second comment and it takes too much time.
});

describe('Uncategorized category', () => {
  it('should check JavaScript category, if it displays right blogs', async function() {
    const homePage = new HomePage(browserWindow);

    await homePage.uncategorizedClick();

    const pageTitle = await homePage.getPageTitle();
    expect(pageTitle).to.be.eql(cTxt.UNCATEGORIZED_PAGE_TITLE);
    console.log(pageTitle);
  }).timeout(10000);

  it('should check if blog is in right category', async function() {
    const homePage = new HomePage(browserWindow);

    await homePage.blogClick();

    const blogCategory = await homePage.checkBlogsCategory();
    expect(blogCategory).to.be.eql(cTxt.UNCATEGORIZED_TITLE);
    console.log(blogCategory);
  }).timeout(5000);
  //No comment's on other blog posts, because it has time limit on second comment and it takes too much time.
});
