import { step } from "../helpers/step";
import { Components } from "../page-components/components";

export class MyAccountPage extends Components {
    public pagePath = '/customer/account'

    private successMessage = this.page.getByRole('alert').filter({ hasText: 'Thank you for registering' })

    @step()
    async getSuccessfulMessageAfterRegistration () {
        await this.inHeader.welcomeButton.waitFor({ state: "visible" })
        return this.successMessage.textContent()
    }


}
