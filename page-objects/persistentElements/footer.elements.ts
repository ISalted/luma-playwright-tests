import { Page } from "@playwright/test"
// import { BasePage } from "../../page-objects/helpers/basePage"

export abstract class BasePage {
    constructor(protected page: Page) { }
}

export class footerElements extends BasePage {
    readonly writeForUsButton = this.page.locator('.footer.content').getByRole('link', { name: 'Write for us' })
    readonly subscribeToOurMailingListButton =  this.page.locator('.footer.content').getByRole('link', { name: 'Subscribe to our mailing list' })
    readonly contactUsButton =  this.page.locator('.footer.content').getByRole('link', { name: 'Contact us' })
    readonly hireASofwareTestingButton =  this.page.locator('.footer.content').getByRole('link', { name: 'Hire a Sofware Testing/QA Company' })
    readonly searchTermsButton =  this.page.locator('.footer.content').getByRole('link', { name: 'Search Terms' })
    readonly privacyAndCookiePolicyButton =  this.page.locator('.footer.content').getByRole('link', { name: 'Privacy and Cookie Policy' })
    readonly advancedSearchButton =  this.page.locator('.footer.content').getByRole('link', { name: 'Advanced Search' })
    readonly ordersAndReturnsButton =  this.page.locator('.footer.content').getByRole('link', { name: 'Orders and Returns' })

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
