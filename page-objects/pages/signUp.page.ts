import { step } from "../helpers/step";
import { Components } from "../page-components/components";

export class SinghUpPage extends Components {
    public pagePath = '/customer/account/create/'

    private firstNameFld = this.page.getByRole('textbox', { name: 'First Name*' })
    private lastNameFld = this.page.getByRole('textbox', { name: 'Last Name*' })
    private emailFld = this.page.getByRole('textbox', { name: 'Email*' })
    private emailErrorMsg = this.page.locator('#email_address-error')
    private passFld = this.page.getByRole('textbox', { name: 'Password*', exact: true })
    private passwordErrorMsg = this.page.locator('#password-error')
    private passwordCorfirmErrorMsg = this.page.locator('#password-confirmation-error')
    private passwordStrengthMeter = this.page.locator('#password-strength-meter-label')
    private passConfirmFld = this.page.getByRole('textbox', { name: 'Confirm Password*', exact: true })
    private createBtn = this.page.locator('//*[@class="action submit primary"]');
    private existingAccountMsg = this.page.getByRole('alert').filter({ hasText: 'There is already an account with this email' })



    @step()
    async visitSignUpPage () {
        await this.page.goto("/customer/account/create/")
    }

    async fillDataAndCreateAnAccount (userData) {
        const Timestamp = Math.floor(Date.now() / 1000)

        await this.firstNameFld.fill('TestCustomer')
        await this.lastNameFld.fill(Timestamp.toString())
        await this.emailFld.fill(userData.email)
        await this.passFld.fill(userData.pass)
        await this.passConfirmFld.fill(userData.confirmPass)
        await this.createBtn.click()
        await this.page.waitForLoadState('networkidle')

    }

    async fillOnlyPass(userData) {
        await this.passFld.fill(userData.pass)
        await this.passConfirmFld.fill(userData.confirmPass)
    }

    @step()
    async getExistingAccountMessage () {
        await this.existingAccountMsg.waitFor({ state: 'visible' })
        return this.existingAccountMsg.textContent()
    }

    @step()
    async getInvalidEmailMessage () {
        await this.emailErrorMsg.waitFor({ state: 'visible' })
        return this.emailErrorMsg.textContent()
    }

    @step()
    async getInvalidPasswordMessage () {
        await this.passwordErrorMsg.waitFor({ state: 'visible' })
        return this.passwordErrorMsg.textContent()
    }

    @step()
    async getInvalidConfirmPasswordMessage() {
        await this.passwordCorfirmErrorMsg.waitFor({ state: 'visible' })
        return this.passwordCorfirmErrorMsg.textContent()
    }

    @step()
    async getPasswordStrengthMeter(expectedStrengt) {
        await this.passwordStrengthMeter.getByText(expectedStrengt).waitFor({ state: 'visible' })
        return this.passwordStrengthMeter.textContent()
    }

}
