import { BasePage } from "./helpers/basePage"
import { Locator, Page } from "@playwright/test";

export class SinghUpPage extends BasePage {
    readonly firstName = this.page.getByRole('textbox', { name: 'First Name*' })
    readonly lastName = this.page.getByRole('textbox', { name: 'Last Name*' })
    readonly emailFill = this.page.getByRole('textbox', { name: 'Email*' })
    readonly emailErrorMessage = this.page.locator('#email_address-error')
    readonly passFill = this.page.getByRole('textbox', { name: 'Password*', exact: true })
    readonly passwordErrorMessage = this.page.locator('#password-error')
    readonly passConfirmFill = this.page.getByRole('textbox', { name: 'Confirm Password*', exact: true })
    readonly CreateButton = this.page.locator('//*[@class="action submit primary"]');
    readonly existingAccountMessage = this.page.getByRole('alert').filter({ hasText: 'There is already an account with this email' })

    constructor(page: Page) {
        super(page);
    }

    visitSignUpPage = async () => {
        await this.page.goto("/customer/account/create/")
    }

    fillDataAndCreateAnAccount = async (userData) => {
        const Timestamp = Math.floor(Date.now() / 1000)

        await this.firstName.fill('TestCustomer')
        await this.lastName.fill(Timestamp.toString())
        await this.emailFill.fill(userData.email)
        await this.passFill.fill(userData.pass)
        await this.passConfirmFill.fill(userData.pass)
        await this.CreateButton.click()
    }

    getExistingAccountMessage = async () => {
        await this.existingAccountMessage.waitFor({ state: 'visible' })
        return this.existingAccountMessage.textContent()
    }

    getInvalidEmailMessage = async () => {
        await this.emailErrorMessage.waitFor({ state: 'visible' })
        return this.emailErrorMessage.textContent()
    }

    getInvalidPasswordMessage = async () => {
        await this.passwordErrorMessage.waitFor({ state: 'visible' })
        return this.passwordErrorMessage.textContent()
    }

}
