import { step } from "../helpers/step";
import { BasePage } from "../helpers/basePage";

export class FooterElements extends BasePage{

    private root = this.page.locator('.footer.content')

    public writeForUsButton = this.root.getByRole('link', { name: 'Write for us' })
    public subscribeToOurMailingListButton = this.root.getByRole('link', { name: 'Subscribe to our mailing list' })
    public contactUsButton = this.root.getByRole('link', { name: 'Contact us' })
    public hireASofwareTestingButton =  this.root.getByRole('link', { name: 'Hire a Sofware Testing/QA Company' })
    public searchTermsButton =  this.root.getByRole('link', { name: 'Search Terms' })
    public privacyAndCookiePolicyButton =  this.root.getByRole('link', { name: 'Privacy and Cookie Policy' })
    public advancedSearchButton =  this.root.getByRole('link', { name: 'Advanced Search' })
    public ordersAndReturnsButton =  this.root.getByRole('link', { name: 'Orders and Returns' })

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
