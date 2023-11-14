import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(('http://localhost:4200'))
})

test.describe('Form Layouts page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Input Fields Test', async ({ page }) => {
        const userTheGridEmailInput = page.locator('//*[@id="inputEmail1"]')
        const userTheGridPassInput = page.locator('//*[@id="inputPassword2"]')

        await userTheGridEmailInput.fill('test1@gmail.com')
        await userTheGridPassInput.fill('test123')
        await userTheGridEmailInput.clear()
        await userTheGridEmailInput.fill('test2@gmail.com')
        await userTheGridEmailInput.clear()
        await userTheGridEmailInput.pressSequentially('test3@gmail.com', { delay: 100 }) //type is depricated



        // generic asserions
        const resultValue = await userTheGridEmailInput.inputValue()
        expect(resultValue).toEqual('test3@gmail.com')

        // locator asserions
        await expect(userTheGridEmailInput).toHaveValue('test3@gmail.com')

    })
})
