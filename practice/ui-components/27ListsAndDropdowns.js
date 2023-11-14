import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(('http://localhost:4200'))
})

test('List and dropdowns Test', async ({ page }) => {
    // page.getByRole('list') //when the list has a UL tag
    // page.getByRole('listitem') //when  the list has LI tag

    const themeDropDownMenu = page.locator('ngx-header nb-select')
    await themeDropDownMenu.click()

    const listOfTheme = page.locator('nb-option-list nb-option')
    expect(listOfTheme).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])

    await listOfTheme.filter({ hasText: "Cosmic" }).click()

    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        "Light": 'rgb(255, 255, 255)',
        "Dark": 'rgb(34, 43, 69)',
        "Cosmic": 'rgb(50, 50, 89)',
        "Corporate": 'rgb(255, 255, 255)'
    }

    for (const color in colors) {
        await themeDropDownMenu.click()
        await listOfTheme.filter({ hasText: color }).click()
        await expect(header).toHaveCSS('background-color', colors[color])
    }
})

