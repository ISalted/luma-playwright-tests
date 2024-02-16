import { Locator, Page } from "@playwright/test";
import { step } from "../helpers/step";
import { Base } from "../helpers/base"

export class MyAccountPage extends Base {
    public pagePath = '/customer/account'

    private successMessage = this.page.getByRole('alert').filter({ hasText: 'Thank you for registering' })

    @step()
    async getSuccessfulMessageAfterRegistration () {
        await this.inHeader.welcomeButton.waitFor({ state: "visible" })
        return this.successMessage.textContent()
    }


}
