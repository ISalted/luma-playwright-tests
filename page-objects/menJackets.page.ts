import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./helpers/basePage"

export class MenJacketsPage extends BasePage {
    readonly sortByDropdownButton = this.page.locator('(//*[@class="sorter-options"])[1]')
    readonly productTitle = this.page.locator('(//*[@class="product-item-link"])')
    
    constructor(page: Page) {
        super(page)
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
