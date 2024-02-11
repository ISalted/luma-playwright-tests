import { Locator, Page } from "@playwright/test";
import { BasePage } from "./helpers/basePage"

export class ShoppingCartPage extends BasePage {
    readonly basketCards = this.page.locator('.cart.item')
    readonly deleteItemButton = this.basketCards.locator('.action.action-delete')
    readonly basketItemPrice = this.basketCards.locator('.subtotal').locator('.price')

    constructor (page: Page){
        super(page)
    }

    visitShoppingCartPageByUrl = async () => {
        await this.page.goto("/checkout/cart/")
    }

    removeAllItemsFromShoppingCart = async () => {
        await this.basketCards.first().waitFor({ state: 'visible' })
        let countOfItems = await this.basketCards.count()

        while (countOfItems !== 0) {
            await this.deleteItemButton.first().click()
            countOfItems--;
            await this.page.waitForFunction(
                (expectedCount) => {
                    const liElements = Array.from(document.querySelectorAll('[id="mini-cart"] li'));
                    return liElements.length === expectedCount;
                }, countOfItems
            )
        }
        await this.basketCards.first().waitFor({ state: 'hidden' })
        countOfItems = await this.basketCards.count()
        return countOfItems
    }

    removeCheapestItem = async () => {
        await this.basketCards.first().waitFor({ state: 'visible' })
        const countOfItems = await this.basketCards.count()

        if (countOfItems !== 0) {
            let allPriceTexts = await this.basketItemPrice.allInnerTexts()
            let justNumb = allPriceTexts.map((element) => {
                return parseInt(element.replace("$", ""), 10)
            })
            let smallestPrice = Math.min(...justNumb)
            let smallestPriceIdx = justNumb.indexOf(smallestPrice)
            await this.deleteItemButton.nth(smallestPriceIdx).click()
            await this.basketItemPrice.filter({ hasText: `${justNumb}` }).waitFor({state: 'hidden'})
            await this.page.reload()

            allPriceTexts = await this.basketItemPrice.allInnerTexts()
            justNumb = allPriceTexts.map((element) => {
                return parseInt(element.replace("$", ""), 10)
            })
            smallestPrice = Math.min(...justNumb)

            return smallestPrice

        }
    }
}
