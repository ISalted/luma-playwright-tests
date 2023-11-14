import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(('http://localhost:4200'))
})

test.describe('Form Layouts page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()
    })

    test('Checkbox Test', async ({ page }) => {
        const hideOnClickCheckBox = page.getByRole('checkbox', { name: 'Hide on click' })
        const preventArisingCheckBox = page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' })
        const showToastCheckBox = page.getByRole('checkbox', { name: 'Show toast with icon' })
        const allBoxes = page.getByRole('checkbox')

        // await hideOnClickCheckBox.click({force: true})
        // await preventArisingCheckBox.check({ force: true })
        // await showToastCheckBox.uncheck({ force: true })

        for (const box of await allBoxes.all()) {
            await box.check({ force: true })
            expect(await box.isChecked()).toBeTruthy()
        }

        for (const box of await allBoxes.all()) {
            await box.uncheck({ force: true })
            expect(await box.isChecked()).toBeFalsy()
        }
    })
})
