import {test} from '@playwright/test';

test.beforeAll(async({page})=>{
    await page.goto('http://google.com')
})

test.beforeEach(async({page}) => {
    await page.goto('http://google.com')
})

test.afterEach(async ({ page }) => {

})

test.afterAll(async({page})=> {

})
