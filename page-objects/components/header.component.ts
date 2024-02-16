import { Page } from "@playwright/test"
import { step } from "../helpers/step";

export class HeaderElements {
    constructor(protected page: Page) { }

    public writeForUsLink = this.page.getByRole('banner').locator('.not-logged-in', { hasText: "Write for us" })
    public welcomeButton = this.page.getByRole('banner').locator('.logged-in', { hasText: "Welcome, " })
    public signInButton = this.page.getByRole('link', { name: 'Sign In' })
    public createAnAccountButton = this.page.getByRole('link', { name: 'Create an Account' })

    public logoButton = this.page.getByLabel('store logo')

    public searchField = this.page.getByPlaceholder('Search entire store here...')
    public searchButoon = this.page.getByRole('button', { name: 'Search' })

    public basketCounter:any = this.page.locator('.counter-number')
    public basketCards = this.page.locator('#mini-cart')

    public showBasketContentsButton = this.page.locator('.action.showcart')
    public hideBasketContentsButton = this.page.locator('.action.showcart.active')

    private productItemName = (inputProductName?: string) => {
        return this.basketCards.locator('li', { hasText: inputProductName }).locator('.product-item-name')
    }
    private deleteItemButton = (inputProductName?: string) => {
        return this.basketCards.locator('li', { hasText: inputProductName }).locator('.action.delete')
    }


    public proceedToCheckoutButton = this.page.getByRole('button', { name: 'Proceed to Checkout' })
    public viewAndEditCartButton = this.page.getByRole('link', { name: 'View and Edit Cart' })

    public acceptDeleteItemButton = this.page.getByRole('button', { name: 'OK' })

    @step()
    async logoButtonClick () {
        await this.logoButton.click()
        await this.logoButton.waitFor({state: 'visible'})
    }

    @step()
    async signInButtonClick () {
        await this.signInButton.click()
    }

    @step()
    async createAnAccountButtonClick () {
        await this.createAnAccountButton.click()
    }

    @step()
    async getWelcomeMessageFromHeader () {
        return await this.welcomeButton.textContent()
    }

    @step()
    async searchEntireStore (searchData: string) {
        await this.searchField.fill(searchData)
        await this.searchButoon.click()
    }

    @step()
    async getBasketCounter (actualCounterNumber?: number) {
        let counter = await this.basketCounter.filter({ hasText: actualCounterNumber }).textContent()
        if (counter === undefined) counter = 0
        return parseInt(counter, 10)
    }

    @step()
    async getProductItemNameFromBasket (inputProductName: string) {
        await this.showBasketContentsButton.click()
        let getProductNameInTheBasket = await this.productItemName(inputProductName).textContent()
        return getProductNameInTheBasket?.replace(/^[^a-zA-Z]*([a-zA-Z].*[a-zA-Z])[^a-zA-Z]*$/, '$1')
    }

    @step()
    async goToCheckoutPageFromHeader () {
        await this.basketCounter.waitFor({ state: "attached" })
        await this.showBasketContentsButton.click()
        await this.proceedToCheckoutButton.waitFor()
        await this.proceedToCheckoutButton.click()
    }

    @step()
    async goToShoppingCartPageFromHeader (){
        await this.basketCounter.waitFor({ state: "attached" })
        await this.showBasketContentsButton.click()
        await this.viewAndEditCartButton.click()
    }

    @step()
    async deleteItemFromTheBasket (inputProductName?: string) {
        await this.showBasketContentsButton.click()
        await this.deleteItemButton(inputProductName).click()
        await this.acceptDeleteItemButton.click()
        await this.productItemName(inputProductName).waitFor({ state: 'hidden' })
        return await this.productItemName(inputProductName).isVisible()
    }

    @step()
    async clearBasketFromHeader () {
        let countOfItems = await this.basketCards.locator('li').count()
        await this.showBasketContentsButton.click()
        await this.basketCards.first().waitFor( { state: 'visible' } )

        while (countOfItems !== 0) {
            await this.deleteItemButton().first().click()
            await this.acceptDeleteItemButton.click()
            countOfItems--
            await this.page.waitForFunction(
                (expectedCount) => {
                    const liElements = Array.from(document.querySelectorAll('[id="mini-cart"] li'));
                    return liElements.length === expectedCount;
                }, countOfItems
            )
        }
        countOfItems = await this.basketCards.count()
        return countOfItems
    }
}
