import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(('http://localhost:4200'))
})

test.describe('Form Layouts page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Tooltip').click()
    })

    test('Tooltips Test', async ({ page }) => {
        const toolTipPlacementCard = page.locator('nb-card', { hasText: 'Tooltip Placements'})
        await toolTipPlacementCard.getByRole('button', {name: "Right"}).hover()

        page.getByRole('tooltip') //if you have a role tooltip created

        const toolTipPlacement = await page.locator('nb-tooltip').textContent()
        expect(toolTipPlacement).toEqual('This is a tooltip')

        const toolTipIconCard = page.locator('nb-card', { hasText: 'Tooltip With Icon' })
        await toolTipIconCard.getByRole('button', { name: "Show Tooltip" }).nth(1).click()

        const toolTipIcon = await page.locator('nb-tooltip').textContent()
        await expect(page.locator('[data-name="alert-triangle"]')).toBeAttached();

    })
})
