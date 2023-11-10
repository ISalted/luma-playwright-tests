import { test } from '@playwright/test';

test('locating child elements', async ({ page }) => {
    await page.goto(('http://localhost:4200/pages/forms/layouts'))

    await page.locator('nb-card nd-radio :text-is("Option 1")') // That's how the hierarchy is built from top to bottom

    await page.locator('nb-card').nth(3).getByrole('button').click()
})
