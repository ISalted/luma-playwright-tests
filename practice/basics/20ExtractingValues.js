import { expect, test } from '@playwright/test';

test('extracting values', async ({ page }) => {
    await page.goto(('http://localhost:4200/pages/forms/layouts'))
    //get single text value
    const basicFormSubmitButton = await page.locator('(//*[@type="submit"])[4]').textContent()
    console.log(basicFormSubmitButton)
    expect(basicFormSubmitButton).toEqual('Submit')

    //get all text values
    const allRadioButtonLables = await page.locator('//nb-radio').allTextContents()
    console.log(allRadioButtonLables)

    //get input value
    await page.locator('#exampleInputEmail1').fill('test@test.com')
    const value = await page.locator('#exampleInputEmail1').inputValue()
    console.log(value)

    //get attribute
    const placeholderValue = await page.locator('#exampleInputEmail1').getAttribute('placeholder')
    console.log(placeholderValue)
})

