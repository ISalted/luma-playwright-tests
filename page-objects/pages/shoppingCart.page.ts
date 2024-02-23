import { step } from "../helpers/step";
import { Components } from "../page-components/components";

export class ShoppingCartPage extends Components {
    public pagePath = '/checkout/cart'

    private basketCards = this.page.locator('.cart.item')
    private deleteItemBtn = this.basketCards.locator('.action.action-delete')
    private basketItemPrice: any = this.basketCards.locator('.subtotal').locator('.price')

    @step()
    async visitPageByUrl () {
        await this.page.goto("/checkout/cart")
    }

    @step()
    async clearShoppingCart () {
        await this.basketCards.first().waitFor({ state: 'visible' })
        let countOfItems = await this.basketCards.count()

        while (countOfItems !== 0) {
            await this.deleteItemBtn.first().click()
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

    @step()
    async removeCheapestItem () {
        await this.basketCards.first().waitFor({ state: 'visible' })
        const countOfItems = await this.basketCards.count()

        if (countOfItems !== 0) {
            let allPriceTexts = await this.basketItemPrice.allInnerTexts()
            let justNumb = allPriceTexts.map((element) => {
                return parseInt(element.replace("$", ""), 10)
            })
            let smallestPrice = Math.min(...justNumb)
            let smallestPriceIdx = justNumb.indexOf(smallestPrice)
            await this.deleteItemBtn.nth(smallestPriceIdx).click()
            await this.basketItemPrice.filter({ hasText: justNumb }).waitFor({state: 'hidden'})
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
