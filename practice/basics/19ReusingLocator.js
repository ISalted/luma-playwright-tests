import { test } from '@playwright/test';

test('reusing test locator', async ({ page }) => {
    await page.goto(('http://localhost:4200/pages/forms/layouts'))
    // await page.getByLabel('Email address').fill('test@test@gmail.com')
    // await page.locator('#exampleInputPassword1').fill("test111")
    // await page.locator('form').filter({ hasText: 'Email addressPasswordCheck me outSubmit' }).getByRole('button').click()

    const basicForm = page.locator('nb-card', { hasText: "Basic Form" })

    await basicForm.getByRole('textbox', { name: "Email" }).fill('test@test@gmail.com')
    await basicForm.getByRole('textbox', { name: "Password" }).fill("test111")
    await basicForm.getByRole('button').click()
})

