import { Locator, Page } from "@playwright/test";
import { BasePage } from "./helpers/basePage"

export class MyAccountPage extends BasePage {
    readonly successMessage = this.page.getByRole('alert').filter({ hasText: 'Thank you for registering' })

    constructor(page: Page) {
        super(page)
    }

    getSuccessfulMessageAfterRegistration = async () => {
        await this.inHeader.welcomeButton.waitFor({ state: "visible" })
        return this.successMessage.textContent()
    }


}
