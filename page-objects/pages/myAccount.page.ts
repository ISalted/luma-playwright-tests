import { step } from "../helpers/step";
import { Components } from "../page-components/components";

export class MyAccountPage extends Components {
    public pagePath = '/customer/account'

    private successMsg = this.page.getByRole('alert').filter({ hasText: 'Thank you for registering' })

    @step()
    async getRegistrationSuccessMsg () {
        await this.inHeader.welcomeBtn.waitFor()
        return this.successMsg.textContent()
    }


}
