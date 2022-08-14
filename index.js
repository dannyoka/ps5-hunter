require('dotenv').config();
const puppeteer = require('puppeteer');
const cron = require('node-cron');
const { sendAlert } = require('./apis/twilio');

const url =
  'https://www.bestbuy.com/site/sony-playstation-5-console/6426149.p?skuId=6426149';

const url2 =
  'https://www.bestbuy.com/site/macbook-air-13-3-laptop-apple-m1-chip-8gb-memory-256gb-ssd-space-gray/5721600.p?skuId=5721600';

let inStock = false;

const init = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url);
  const element = await page.waitForSelector(
    'div.fulfillment-add-to-cart-button > div > div > button'
  );
  const text = await page.evaluate((element) => element.textContent, element);
  if (text === 'Sold Out') {
    console.log('Sorry, there are no PS5s available');
  } else {
    inStock = true;
    sendAlert(url);
  }
  browser.close();
};

cron.schedule('0-59 * * * *', () => {
  if (!inStock) {
    init(url);
  } else {
    process.exit(0);
  }
});
