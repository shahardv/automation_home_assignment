const { test, expect } = require('@playwright/test');

import { chromium } from "playwright";


test.describe('Calander testing', () => {

  test('Open react calender', async () => {
    const browser = await chromium.launch({
      headless: false
    })
    const context = await browser.newContext();
    const page = await context.newPage();

    await test.step('open react calender ', async ()=> {
        await page.goto('https://stephenchou1017.github.io/scheduler/#/');
      });
`s`
    await test.step('assignment one ', async ()=> {
      await page.click("//span[normalize-space()='Infinite scroll']");
      await page.click("//label[@class='ant-radio-button-wrapper']");
    });
      
    await test.step('assignment two ', async ()=> {
      await page.click("//span[normalize-space()='Add more']");
      await page.click("//span[contains(text(),'Month')]");
      await page.click("//span[@class='header2-text-label']");
      await page.click("//td[@title='March 5, 2024']//div[@class='ant-fullcalendar-value'][normalize-space()='05']");
          

      page.on('dialog', async dialog => {
        console.log('Dialog type:', dialog.type());
        console.log('Dialog message:', dialog.message());
        await dialog.dismiss();
      });
          
    });  

  })


})