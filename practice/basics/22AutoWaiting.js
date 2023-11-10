import { expect, test } from '@playwright/test';
import { exec } from 'child_process';

test('auto waiting', async ({ page }) => {
    // https://playwright.dev/docs/actionability method list

    await page.goto(('http://uitestingplayground.com/ajax'))

    await page.getByRole('button', { name: 'Button Triggering AJAX Request' }).click()

    const successButton = page.locator('.bg-success')
    await successButton.waitFor({ state: "attached" }) // waits for the element to appear in the DOM.
    const result = await successButton.allTextContents()
    await expect(result).toContain('Data loaded with AJAX get request.')
    // await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})

    // ___ wait for element
    await page.waitForSelector('.bg-success')

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')


})

test('alteretive waiting', async ({ page }) => {
    await page.goto(('http://uitestingplayground.com/ajax'))
    const successButton = page.locator('.bg-success')

    await page.getByRole('button', { name: 'Button Triggering AJAX Request' }).click()

    //* ___ wait for element
    // await page.waitForSelector('.bg-success')

    //* ___ wait for particlular
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //* ___ wait for network calls to be completed ('NOT RECOMMENDED)
    await page.waitForLoadState('networkidle') //The application has fully loaded.

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

