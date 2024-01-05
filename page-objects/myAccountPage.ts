import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helpers/helperBase"

export class MyAccountPage extends HelperBase {
    successMessage: any;

    constructor(page: Page) {
        super(page)

        this.successMessage = page.getByRole('alert').filter({ hasText: 'Thank you for registering' })
    }

    getSuccessfulMessageAfterRegistration = async () => {
        this.page.pause()
        return this.successMessage.textContent()
    }


}
