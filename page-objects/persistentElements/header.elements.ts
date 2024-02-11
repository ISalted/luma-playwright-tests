import { Locator, Page } from "@playwright/test"
// import { BasePage } from "../../page-objects/helpers/basePage"

export abstract class BasePage {
    constructor(protected page: Page) { }
}


export class HeaderElements extends BasePage {

    readonly writeForUsLink = this.page.getByRole('banner').locator('.not-logged-in', { hasText: "Write for us" })
    readonly welcomeButton = this.page.getByRole('banner').locator('.logged-in', { hasText: "Welcome, " })
    readonly signInButton = this.page.locator('.header.links > li').filter({ hasText: "Sign In" }).first()
    readonly createAnAccountButton = this.page.locator('.header.links > li').filter({ hasText: "Create an Account" }).first()

    readonly logoButton = this.page.getByLabel('store logo')

    readonly searchField = this.page.getByPlaceholder('Search entire store here...')
    readonly searchButoon = this.page.getByRole('button', { name: 'Search' })

    readonly basketCounter:any = this.page.locator('.counter-number')
    readonly basketCards = this.page.locator('#mini-cart')

    readonly showBasketContentsButton = this.page.locator('.action.showcart')
    readonly hideBasketContentsButton = this.page.locator('.action.showcart.active')

    readonly productItemName = (inputProductName?: string) => {
        return this.basketCards.locator('li', { hasText: inputProductName }).locator('.product-item-name')
    }
    readonly deleteItemButton = (inputProductName?: string) => {
        return this.basketCards.locator('li', { hasText: inputProductName }).locator('.action.delete')
    }


    readonly proceedToCheckoutButton = this.page.getByRole('button', { name: 'Proceed to Checkout' })
    readonly viewAndEditCartButton = this.page.getByRole('link', { name: 'View and Edit Cart' })

    readonly acceptDeleteItemButton = this.page.getByRole('button', { name: 'OK' })

    constructor(page: Page) {
        super(page)
    }

    logoButtonClick = async () => {
        await this.logoButton.click()
        await this.logoButton.waitFor({state: 'visible'})
    }

    signInButtonClick = async () => {
        await this.signInButton.click()
    }

    createAnAccountButtonClick = async () => {
        await this.createAnAccountButton.click()
    }

    getWelcomeMessageFromHeader = async () => {
        return await this.welcomeButton.textContent()
    }

    searchEntireStore = async (searchData: string) => {
        await this.searchField.fill(searchData)
        await this.searchButoon.click()
    }

    getBasketCounter = async (actualCounterNumber?: number) => {
        let counter = await this.basketCounter.filter({ hasText: actualCounterNumber }).textContent()
        if (counter === undefined) counter = 0
        return parseInt(counter, 10)
    }

    getProductItemNameFromBasket = async (inputProductName: string) => {
        await this.showBasketContentsButton.click()
        let getProductNameInTheBasket = await this.productItemName(inputProductName).textContent()
        return getProductNameInTheBasket?.replace(/^[^a-zA-Z]*([a-zA-Z].*[a-zA-Z])[^a-zA-Z]*$/, '$1')
    }

    goToCheckoutPageFromHeader = async () => {
        await this.basketCounter.waitFor({ state: "attached" })
        await this.showBasketContentsButton.click()
        await this.proceedToCheckoutButton.waitFor()
        await this.proceedToCheckoutButton.click()
    }

    goToShoppingCartPageFromHeader = async () => {
        await this.basketCounter.waitFor({ state: "attached" })
        await this.showBasketContentsButton.click()
        await this.viewAndEditCartButton.click()
    }

    deleteItemFromTheBasket = async (inputProductName?: string) => {
        await this.showBasketContentsButton.click()
        await this.deleteItemButton(inputProductName).click()
        await this.acceptDeleteItemButton.click()
        await this.productItemName(inputProductName).waitFor({ state: 'hidden' })
        return await this.productItemName(inputProductName).isVisible()
    }

    clearBasketFromHeader = async () => {
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
