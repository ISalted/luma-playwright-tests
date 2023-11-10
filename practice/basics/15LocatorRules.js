import { test } from '@playwright/test';

test('Locator syntax rules', async ({ page }) => {
    // by Tag name
    page.locator('input')

    // by Tag name first
    page.locator('input').first().click()

    // by ID name
    page.locator('#inputEmail')

    // by Class name
    page.locator('.shape-rectangle')

    // by attribute
    page.locator('[placeholder="Email"]')

    // by Class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // combine different selectors (It's important without spaces. Everything is concatenated.)
    page.locator('input[placeholder="Email"].shape-rectangle[nbinput]')

    // xPath
    page.locator('//*[@id="inputEmail"]')

    // by partial text match
    page.locator(':text("Using")')

    // by exact text match
    page.locator(':text-is("Using the Grid")')
})
