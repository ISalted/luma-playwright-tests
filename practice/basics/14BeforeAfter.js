import {test} from '@playwright/test';

test.beforeAll(async({page})=>{
    await page.goto('http://google.com')
})

test.beforeEach.skip(async({page}) => {
    await page.goto('http://google.com')
})

test.afterEach.skip(async ({ page }) => {

})

test.afterAll.skip(async({page})=> {

})
