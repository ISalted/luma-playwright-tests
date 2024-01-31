import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helpers/helperBase"

export class MyAccountPage extends HelperBase {
    readonly successMessage: Locator;

    constructor(page: Page) {
        super(page)

        this.successMessage = page.getByRole('alert').filter({ hasText: 'Thank you for registering' })
    }

    getSuccessfulMessageAfterRegistration = async () => {
        await this.inHeader.welcomeButton.waitFor({ state: "visible" })
        return this.successMessage.textContent()
    }


}
