import { test } from '@playwright/test';

test.only('locating parent elements', async ({ page }) => {
    await page.goto(('http://localhost:4200/pages/forms/layouts'))


    await page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" }).click()

    await page.locator('nb-card', { has: page.locator('#inputEmail1') }).getByRole('textbox', { name: "Email" }).click()

    await page.locator('nb-card').filter({ hasText: "Basic form" }).getByRole('textbox', { name: "Email" }).click()

    await page.locator('nb-card').filter({ has: page.locator('.status-danger') }).getByRole('textbox', { name: "Password" }).click()
    //  Спершу шукаємо усі nb-cards, потім ми шукаємо тільки ті nb-cards які мають чекбокси, потім ми фільтруємо по SignIn, потім по email`у натискаємо на кнопку
    await page.locator('nb-card').filter({ has: page.locator('nb-checkbox') }).filter({ hasText: "Sign In" }).getByRole('textbox', { name: "Email" }).click()

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', { name: "Email" }).click()

})

