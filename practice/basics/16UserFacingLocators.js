import { test } from '@playwright/test';
test('user facing locators', async ({ page }) => {
    await page.goto(('http://localhost:4200/pages/forms/layouts'))

    await page.getByRole('textbox', { name: "Email" }).first().click()

    await page.getByRole('button', { name: "Sign in" }).first().click()


    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid')

    await page.getByTestId('') // It searches for a locator using a unique ID that can be manually added by the developer.

    await page.getByTitle('IoT Dashboard')
})
