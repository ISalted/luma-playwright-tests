import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(('http://localhost:4200'))
})

test.describe('Form Layouts page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Radio button Test', async ({ page }) => {
        const userTheGridEmailInput = page.locator('//*[@id="inputEmail1"]')
        const userTheGridPassInput = page.locator('//*[@id="inputPassword2"]')
        const userGridRadioButton1 = page.getByText('Option 1')
        const userGridRadioButton2 = page.getByText('Option 2')

        await userTheGridEmailInput.fill('test1@gmail.com')
        await userTheGridPassInput.fill('test123')
        await userGridRadioButton1.check({ force: true }) // If radio button is "visual hidden" we should use "force" parameter

        // first type of assertion to check
        const radioStatus1 = await userGridRadioButton1.isChecked()
        expect(radioStatus1).toBeTruthy()

        const radioStatus2 = await userGridRadioButton2.isChecked()
        expect(radioStatus2).toBeFalsy()

        // second type of assertion to check
        await expect(userGridRadioButton1).toBeChecked()

    })
})
