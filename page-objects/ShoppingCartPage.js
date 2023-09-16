import { expect } from "@playwright/test";

export class ShoppingCartPage{
    constructor (page){
        this.page = page

        this.deleteItemButton = page.locator('(//*[@class= "action action-delete"])')
        this.basketCards = page.locator('//*[@class="cart item"]')
        this.basketItemPrice = page.locator('//*[@class="col subtotal"]//*[@class="price"]')
    }

    visitShoppingCartPage = async () => {
        await this.page.goto("/checkout/cart/")
    }

    removeItemsFromShoppingCart = async () => {
        const inUrl = await this.page.url();
        await this.visitShoppingCartPage()

        await this.removeAllItems()
        const expectedResult = 0
        const actualResult = await this.basketCards.count()
        await this.page.goto(inUrl)
        expect(actualResult).toBe(expectedResult)
    }

    removeAllItems = async () => {
        let itemsBeforeRemoval = await this.basketCards.count()

        if (itemsBeforeRemoval === 0) {
            await expect(this.basketCards).toHaveCount(0)
        } else {
            await this.deleteItemButton.first().click()
            itemsBeforeRemoval--;
            await this.page.waitForFunction(
                (expectedCount) => {
                    const liElements = Array.from(document.querySelectorAll('[class="cart item"]'));
                    return liElements.length === expectedCount;
                }, itemsBeforeRemoval
            );
            await this.removeAllItems()
        }
    }

    removeCheapestItem = async () => {
        await this.visitShoppingCartPage()

        const itemsBeforeRemoval = await this.basketCards.count()

        if (isNaN(itemsBeforeRemoval) || itemsBeforeRemoval === 0) {
            await expect(this.basketCards).toHaveCount(0)
        } else {

        const allPriceTexts = await this.basketItemPrice.allInnerTexts()
        const justNumb = allPriceTexts.map((element) => {
            return parseInt(element.replace("$", ""), 10)
        })
            const smallestPrice = Math.min(...justNumb)
            const smallestPriceIdx = justNumb.indexOf(smallestPrice)
            await this.deleteItemButton.nth(smallestPriceIdx).click()
            await expect(this.basketCards).toHaveCount(itemsBeforeRemoval-1)
        }

    }
}
