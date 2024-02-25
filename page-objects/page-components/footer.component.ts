import { step } from "../helpers/step";
import { BasePage } from "../helpers/basePage";

export class FooterElements extends BasePage{

    public writeForUsButton = this.page.locator('.footer.content').getByRole('link', { name: 'Write for us' })
    public subscribeToOurMailingListButton =  this.page.locator('.footer.content').getByRole('link', { name: 'Subscribe to our mailing list' })
    public contactUsButton =  this.page.locator('.footer.content').getByRole('link', { name: 'Contact us' })
    public hireASofwareTestingButton =  this.page.locator('.footer.content').getByRole('link', { name: 'Hire a Sofware Testing/QA Company' })
    public searchTermsButton =  this.page.locator('.footer.content').getByRole('link', { name: 'Search Terms' })
    public privacyAndCookiePolicyButton =  this.page.locator('.footer.content').getByRole('link', { name: 'Privacy and Cookie Policy' })
    public advancedSearchButton =  this.page.locator('.footer.content').getByRole('link', { name: 'Advanced Search' })
    public ordersAndReturnsButton =  this.page.locator('.footer.content').getByRole('link', { name: 'Orders and Returns' })

    @step()
    async writeForUsButtonClick () {
        await this.writeForUsButton.click()
    }

    @step()
    async subscribeToOurMailingListButtonClick () {
        await this.subscribeToOurMailingListButton.click()
    }

    @step()
    async contactUsButtonClick () {
        await this.contactUsButton.click()
    }

    @step()
    async hireASofwareTestingButtonClick () {
        await this.hireASofwareTestingButton.click()
    }

    @step()
    async searchTermsButtonClick () {
        await this.searchTermsButton.click()
    }

    @step()
    async privacyAndCookiePolicyButtonClick () {
        await this.privacyAndCookiePolicyButton.click()
    }

    @step()
    async advancedSearchButtonClick () {
        await this.advancedSearchButton.click()
    }

    @step()
    async ordersAndReturnsButtonClick () {
        await this.ordersAndReturnsButton.click()
    }
}
