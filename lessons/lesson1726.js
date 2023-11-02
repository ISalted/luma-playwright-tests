import { test } from '@playwright/test';

test.only('locating child elements', async ({ page }) => {
    await page.goto(('http://localhost:4200/pages/forms/layouts'))

    await page.locator('nb-card nd-radio :text-is("Option 1")') // Так вибудовується ієрархія зверху вниз

    await page.locator('nb-card').nth(3).getByrole('button').click()


})
