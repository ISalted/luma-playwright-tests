import { expect, test } from '@playwright/test';
import { before, beforeEach } from 'node:test';

test.beforeEach(async({page}) => {
    await page.goto(('http://localhost:4200'))
})

test.describe('Form Layouts page', () => {
    test.beforeEach( async({page}) => {
        await page.getByText('Form').click()
        await page.getByText('Form Layouts').click()
    })

    test.only('input fields', async({page}) => {

    })
})
