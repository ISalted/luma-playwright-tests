import { Locator, Page } from "@playwright/test"

export class HeaderElements{
    readonly logoButton: Locator;
    readonly writeForUsLink: Locator;
    readonly welcomeButton: Locator;
    readonly signInButton: Locator;
    readonly createAnAccountButton: Locator;
    readonly basketCounter: any;
    readonly basketCards: Locator;
    readonly showBasketContentsButton: Locator;
    readonly hideBasketContentsButton: Locator;
    readonly proceedToCheckoutButton: Locator;
    readonly viewAndEditCartButton: Locator;
    readonly deleteItemButton: Function;
    readonly productItemName: Function
    readonly acceptDeleteItemButton: Locator;
    readonly searchField: Locator;
    readonly searchButoon: Locator;



    readonly page: Page


    constructor(page: Page) {
        this.page = page

        this.welcomeButton = page.getByRole('banner').locator('.logged-in', { hasText: "Welcome, " })
        this.writeForUsLink = page.getByRole('banner').locator('.not-logged-in', { hasText: "Write for us" })
        this.signInButton = page.locator('.header.links > li').filter({ hasText: "Sign In" }).first()
        this.createAnAccountButton = page.locator('.header.links > li').filter({ hasText: "Create an Account" }).first()

        this.logoButton = page.getByLabel('store logo')

        this.searchField = page.getByPlaceholder('Search entire store here...')
        this.searchButoon = page.getByRole('button', { name: 'Search' })

        this.basketCounter = page.locator('.counter-number')
        this.basketCards = page.locator('#mini-cart')

        this.showBasketContentsButton = page.locator('.action.showcart')
        this.hideBasketContentsButton = page.locator('.action.showcart.active')

        this.productItemName = (inputProductName?: string) => {
            return this.basketCards.locator('li', { hasText: inputProductName }).locator('.product-item-name')
        }
        this.deleteItemButton = (inputProductName?: string) => {
            return this.basketCards.locator('li', { hasText: inputProductName }).locator('.action.delete')
        }




        this.acceptDeleteItemButton = page.getByRole('button', { name: 'OK' })
        this.proceedToCheckoutButton = page.getByRole('button', { name: 'Proceed to Checkout' })
        this.viewAndEditCartButton = page.getByRole('link', { name: 'View and Edit Cart' })


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
        if (counter === "") counter = 0
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
