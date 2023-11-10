import { expect, test } from '@playwright/test';
import { exec } from 'child_process';

test('assertions', async ({ page }) => {
    await page.goto(('http://localhost:4200/pages/forms/layouts'))

    //General assertions / just a validation of data.
    const basicFormSubmitButton = page.locator('(//*[@type="submit"])[4]')
    const text = await basicFormSubmitButton.textContent()
    expect(text).toEqual("Submit")

    //LocatorAssertions / There are many of them, and they will always wait for the Locator to execute.
    expect(basicFormSubmitButton).toHaveText("Submit")

    //SoftAsserions
    await expect.soft(basicFormSubmitButton).toHaveText("Submit1")
    await basicFormSubmitButton.click()
})

