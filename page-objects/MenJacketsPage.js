import { expect } from "@playwright/test";

export class MenJacketsPage{
    constructor(page) {
        this.page = page
        this.sortByDropdownButton = page.locator('(//*[@class="sorter-options"])[1]')
        this.productTitle = page.locator('(//*[@class="product-item-link"])')
    }

    visitMenJacketsPage = async () => {
        await this.page.goto('/men/tops-men/jackets-men.html')
    }

    sortByCheapest = async () => {
        await this.visitMenJacketsPage()
        const productTitlesBeforeSorting = await this.productTitle.allInnerTexts()
        await this.sortByDropdownButton.selectOption('price')
        await this.page.waitForTimeout(3000);
        const productTitlesAfterSorting = await this.productTitle.allInnerTexts()
        expect(productTitlesBeforeSorting).not.toEqual(productTitlesAfterSorting)
    }
}
