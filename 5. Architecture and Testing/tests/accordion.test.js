const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page;

describe('E2E tests', async function () {
  this.timeout(6000);
  // { headless: true, slowMo: 100 }
  before(async () => { browser = await chromium.launch();});
  after(async () => { await browser.close(); });
  beforeEach(async () => { page = await browser.newPage(); });
  afterEach(async () => { await page.close(); });
  
  
  // { handless: false, slowMo: 500 }
  it('toggles content', async () => {
    await page.goto('http://127.0.0.1:5500/5.%20Architecture%20and%20Testing/Lab/01.%20Accordion/');
    
    await page.waitForSelector('.accordion .head>span')
    const content = await page.textContent('#main');
    
    expect(content).to.contain('Scalable Vector Graphics');
    expect(content).to.contain('Open standard');
    expect(content).to.contain('Unix');
    expect(content).to.contain('ALGOL');
  });

  it('toggles on when more buttons are clicked', async () => {
    await page.goto('http://127.0.0.1:5500/5.%20Architecture%20and%20Testing/Lab/01.%20Accordion/');
    await page.click('text=More');
    await page.waitForSelector('.extra p');

    const text = await page.textContent('.extra p');
    const visible = await page.isVisible('.extra p');

    expect(text).to.contain('Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)-based');
    expect(visible).to.be.true;
  });

  it('toggles off when the less button is clicked', async () => {
    await page.goto('http://127.0.0.1:5500/5.%20Architecture%20and%20Testing/Lab/01.%20Accordion/');
    await page.click('text=More');
    await page.waitForSelector('.extra p');

    let visible = await page.isVisible('.extra p');
    expect(visible).to.be.true;
    
    await page.click('text=Less');
    visible = await page.isVisible('.extra p');
  
    expect(visible).to.be.false;
  });

});
