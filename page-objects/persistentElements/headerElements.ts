import { Locator, Page } from "@playwright/test"

export class HeaderElements{
    public readonly logoButton: Locator;
    public readonly welcomeButton: Locator;
    public readonly signInButton: Locator;
    public readonly createAnAccountButton: Locator;
    public readonly basketCounter: any;
    public readonly basketCards: Locator;
    public readonly openItemInCard: Locator;
    public readonly closeItemInCard: Locator;
    public readonly proceedToCheckoutButton: Locator;
    public readonly viewAndEditCartButton: Locator;
    public readonly deleteItemButton: Locator;
    public readonly acceptDeleteItemButton: Locator;
    public readonly searchField: Locator;
    public readonly searchButoon: Locator;


    readonly page: Page


    constructor(page: Page) {
        this.page = page

        this.logoButton = page.getByLabel('store logo')
        this.welcomeButton = page.getByRole('banner').locator('.logged-in', { hasText: "Welcome, " });
        this.signInButton = page.locator('.header.links > li').filter({ hasText: "Sign In" }).first()
        this.createAnAccountButton = page.locator('.header.links > li').filter({ hasText: "Create an Account" }).first()

        this.basketCounter = page.locator('.counter-number')
        this.basketCards = page.locator('#mini-cart').locator('li')

        this.openItemInCard = page.locator('.action.showcart')
        this.closeItemInCard = page.locator('.action.showcart.active')
        this.proceedToCheckoutButton = page.getByRole('button', { name: 'Proceed to Checkout' })
        this.viewAndEditCartButton = page.getByRole('link', { name: 'View and Edit Cart' })
        this.deleteItemButton = page.locator('.action.delete').first()
        this.acceptDeleteItemButton = page.getByRole('button', { name: 'OK' })

        this.searchField = page.getByPlaceholder('Search entire store here...')
        this.searchButoon = page.getByRole('button', { name: 'Search' })
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

    goToCheckoutPageFromHeader = async () => {
        await this.basketCounter.waitFor({ state: "attached" })
        await this.openItemInCard.click()
        await this.proceedToCheckoutButton.waitFor()
        await this.proceedToCheckoutButton.click()
    }

    goToShoppingCartPageFromHeader = async () => {
        await this.basketCounter.waitFor({ state: "attached" })
        await this.openItemInCard.click()
        await this.viewAndEditCartButton.click()
    }

    clearBasketFromHeader = async () => {
        let countOfItems = await this.basketCards.count()
        await this.openItemInCard.click()
        await this.basketCards.first().waitFor( { state: 'visible' } )

        while (countOfItems !== 0) {
            await this.deleteItemButton.click()
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
