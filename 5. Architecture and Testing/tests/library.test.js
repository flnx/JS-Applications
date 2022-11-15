const { chromium, request } = require('playwright-chromium');
const { expect } = require('chai');

const host =
  'http://127.0.0.1:5500/5.%20Architecture%20and%20Testing/Exercise/02.Book-Library/index.html';

describe('Tests', async function () {
  this.timeout(6000);

  let browser, page;

  before(async () => {
    browser = await chromium.launch({ headless: false, slowMo: 600 });
  });

  after(async () => {
    browser = await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    await page.close();
  });

  it('loads all books', async () => {
    await page.goto(host);
    await page.click('text=Load All Books');

    await page.waitForSelector('#loadBooks');

    const content = await page.textContent('table');

    expect(content).to.contain('C# Fundamentals');
    expect(content).to.contain("Harry Potter and the Philosopher's Stone");
  });

  it('creates a book', async () => {
    await page.goto(host);

    await page.click('text=Load All Books');

    await page.fill('input[name=title]', 'Test');
    await page.fill('input[name=author]', 'Testov');

    await page.click('#createForm button');
    await page.click('text=Load all Books');
    await page.waitForSelector('#loadBooks');
    const content = await page.textContent('table');

    expect(content).to.contain('Test');
    expect(content).to.contain('Testov');
  });

  it.only('edit a book', async () => {
    await page.goto(host);
    await page.click('text=Load All Books');

    await page.click('.editBtn');

    await page.fill('#editForm input[name=title]', 'New Edited Title');
    await page.fill('#editForm input[name=author]', 'New Edited Author');

    await page.click('#editForm button');
    let content = await page.textContent('table');

    expect(content).to.contain('Test');
    await page.click('text=Load all Books');
    await page.waitForSelector('#loadBooks');
    content = await page.textContent('table');
    expect(content).to.contain('New Edited Title');
    expect(content).to.contain('New Edited Author');
  });
});
