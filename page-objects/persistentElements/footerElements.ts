import { Locator, Page } from "@playwright/test"

export class footerElements {
    readonly page: Page

    readonly writeForUsButton: Locator
    readonly subscribeToOurMailingListButton: Locator
    readonly contactUsButton: Locator
    readonly hireASofwareTestingButton: Locator
    readonly searchTermsButton: Locator
    readonly privacyAndCookiePolicyButton: Locator
    readonly advancedSearchButton: Locator
    readonly ordersAndReturnsButton: Locator

    constructor(page: Page) {
        this.page = page

        this.writeForUsButton = page.locator('.footer.content').getByRole('link', { name: 'Write for us' })
        this.subscribeToOurMailingListButton = page.locator('.footer.content').getByRole('link', { name: 'Subscribe to our mailing list' })
        this.contactUsButton = page.locator('.footer.content').getByRole('link', { name: 'Contact us' })
        this.hireASofwareTestingButton = page.locator('.footer.content').getByRole('link', { name: 'Hire a Sofware Testing/QA Company' })
        this.searchTermsButton = page.locator('.footer.content').getByRole('link', { name: 'Search Terms' })
        this.privacyAndCookiePolicyButton = page.locator('.footer.content').getByRole('link', { name: 'Privacy and Cookie Policy' })
        this.advancedSearchButton = page.locator('.footer.content').getByRole('link', { name: 'Advanced Search' })
        this.ordersAndReturnsButton = page.locator('.footer.content').getByRole('link', { name: 'Orders and Returns' })
    }

    writeForUsButtonClick = async () => {
        await this.writeForUsButton.click()
    }

    subscribeToOurMailingListButtonClick = async () => {
        await this.subscribeToOurMailingListButton.click()
    }

    contactUsButtonClick = async () => {
        await this.contactUsButton.click()
    }

    hireASofwareTestingButtonClick = async () => {
        await this.hireASofwareTestingButton.click()
    }

    searchTermsButtonClick = async () => {
        await this.searchTermsButton.click()
    }

    privacyAndCookiePolicyButtonClick = async () => {
        await this.privacyAndCookiePolicyButton.click()
    }

    advancedSearchButtonClick = async () => {
        await this.advancedSearchButton.click()
    }

    ordersAndReturnsButtonClick = async () => {
        await this.ordersAndReturnsButton.click()
    }
}
