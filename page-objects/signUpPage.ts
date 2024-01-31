import { HelperBase } from "./helpers/helperBase"
import { Locator, Page } from "@playwright/test";

export class SinghUpPage extends HelperBase {
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly emailFill: Locator;
    readonly emailErrorMessage: Locator;
    readonly passFill: Locator;
    readonly passwordErrorMessage: Locator;
    readonly passConfirmFill: Locator;
    readonly CreateButton: Locator;
    readonly existingAccountMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.firstName = page.getByRole('textbox', { name: 'First Name*' })
        this.lastName = page.getByRole('textbox', { name: 'Last Name*' })
        this.emailFill = page.getByRole('textbox', { name: 'Email*' })
        this.emailErrorMessage = page.locator('#email_address-error')
        this.passFill = page.getByRole('textbox', { name: 'Password*', exact: true })
        this.passwordErrorMessage = page.locator('#password-error')
        this.passConfirmFill = page.getByRole('textbox', { name: 'Confirm Password*', exact: true })
        this.CreateButton = page.locator('//*[@class="action submit primary"]');

        this.existingAccountMessage = page.getByRole('alert').filter({ hasText: 'There is already an account with this email' })
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
