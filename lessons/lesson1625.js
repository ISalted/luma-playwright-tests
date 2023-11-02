import { test } from '@playwright/test';
test.only('user facing locators', async ({ page }) => {
    await page.goto(('http://localhost:4200/pages/forms/layouts'))

    await page.getByRole('textbox', { name: "Email" }).first().click()

    await page.getByRole('button', { name: "Sign in" }).first().click()


    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid')

    await page.getByTestId('') // шукає локатор по унікальному ІД який вручну може додати розробник

    await page.getByTitle('IoT Dashboard')
})
