import { Base } from "../helpers/base"
import { step } from "../helpers/step";

export class SinghUpPage extends Base {
    public pagePath = '/customer/account/create/'

    private firstName = this.page.getByRole('textbox', { name: 'First Name*' })
    private lastName = this.page.getByRole('textbox', { name: 'Last Name*' })
    private emailFill = this.page.getByRole('textbox', { name: 'Email*' })
    private emailErrorMessage = this.page.locator('#email_address-error')
    private passFill = this.page.getByRole('textbox', { name: 'Password*', exact: true })
    private passwordErrorMessage = this.page.locator('#password-error')
    private passConfirmFill = this.page.getByRole('textbox', { name: 'Confirm Password*', exact: true })
    private CreateButton = this.page.locator('//*[@class="action submit primary"]');
    private existingAccountMessage = this.page.getByRole('alert').filter({ hasText: 'There is already an account with this email' })

    @step()
    async visitSignUpPage () {
        await this.page.goto("/customer/account/create/")
    }

    async fillDataAndCreateAnAccount (userData) {
        const Timestamp = Math.floor(Date.now() / 1000)

        await this.firstName.fill('TestCustomer')
        await this.lastName.fill(Timestamp.toString())
        await this.emailFill.fill(userData.email)
        await this.passFill.fill(userData.pass)
        await this.passConfirmFill.fill(userData.pass)
        await this.CreateButton.click()
    }

    @step()
    async getExistingAccountMessage () {
        await this.existingAccountMessage.waitFor({ state: 'visible' })
        return this.existingAccountMessage.textContent()
    }

    @step()
    async getInvalidEmailMessage () {
        await this.emailErrorMessage.waitFor({ state: 'visible' })
        return this.emailErrorMessage.textContent()
    }

    @step()
    async getInvalidPasswordMessage () {
        await this.passwordErrorMessage.waitFor({ state: 'visible' })
        return this.passwordErrorMessage.textContent()
    }

}
