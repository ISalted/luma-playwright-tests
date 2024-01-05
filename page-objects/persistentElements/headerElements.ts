import { Locator, Page } from "@playwright/test"

export class HeaderPage{
    public readonly logoButton: Locator;
    public readonly welcomeButton: Locator;
    public readonly signInButton: Locator;
    public readonly createAnAccountButton: Locator;
    public readonly basketCounterData: any;
    public readonly basketCards: Locator;
    public readonly openItemInCard: Locator;
    public readonly closeItemInCard: Locator;
    public readonly proceedToCheckoutButton: Locator;
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

        this.basketCounterData = page.locator('.counter-number')
        this.basketCards = page.locator('#mini-cart').locator('li')

        this.openItemInCard = page.locator('.action.showcart')
        this.closeItemInCard = page.locator('.action.showcart.active')
        this.proceedToCheckoutButton = page.getByRole('button', { name: 'Proceed to Checkout' })
        this.deleteItemButton = page.locator('.action.delete').first()
        this.acceptDeleteItemButton = page.getByRole('button', { name: 'OK' })

        this.searchField = page.getByPlaceholder('Search entire store here...')
        this.searchButoon = page.getByRole('button', { name: 'Search' })
    }

    logoButtonClick = async () => {
        await this.logoButton.click()
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
        let counter = await this.basketCounterData.filter({ hasText: actualCounterNumber }).textContent()
        if (counter === "") counter = 0
        return parseInt(counter, 10)
    }

    proceedToCheckout = async () => {
        await this.page.pause()
        await this.basketCounterData.waitFor({ state: "attached" })
        await this.openItemInCard.click()
        await this.proceedToCheckoutButton.click()

    }

    clearBasketFromHeader = async () => {
        await this.page.waitForLoadState('domcontentloaded');
        let itemsBeforeRemoval = await this.basketCards.count()

        if (itemsBeforeRemoval === 0) {
            // skip
        } else {
            await this.openItemInCard.click()
            await this.deleteItemButton.click()
            await this.acceptDeleteItemButton.click()
            await this.closeItemInCard.click()
            itemsBeforeRemoval--;

            await this.page.waitForFunction(
                (expectedCount) => {
                    const liElements = Array.from(document.querySelectorAll('[id="mini-cart"] li'));
                    return liElements.length === expectedCount;
                }, itemsBeforeRemoval
            );
            await this.clearBasketFromHeader()
        }
    }
}
