import { v4 as uuidv4 } from "uuid";
import { HelperBase } from "./helpers/helperBase"
import { Page } from "@playwright/test";

export class SinghUpPage extends HelperBase {
    firstName: any;
    lastName: any;
    loginFill: any;
    passFill: any;
    passConfirmFill: any;
    CreateButton: any;
    existingAccountMessage: any;
    constructor(page: Page) {
        super(page);
        this.firstName = page.getByRole('textbox', { name: 'First Name*' })
        this.lastName = page.getByRole('textbox', { name: 'Last Name*' })
        this.loginFill = page.getByRole('textbox', { name: 'Email*' })
        this.passFill = page.getByRole('textbox', { name: 'Password*', exact: true })
        this.passConfirmFill = page.getByRole('textbox', { name: 'Confirm Password*', exact: true })
        this.CreateButton = page.locator('//*[@class="action submit primary"]');

        this.existingAccountMessage = page.getByRole('alert').filter({ hasText: 'There is already an account with this email' })
    }

    visitSignUpPage = async () => {
        await this.page.goto("/customer/account/create/")
    }

    getUniqueEmailPass(value){
        if (value === 'email') {
            return `${uuidv4()}@gmail.com`
        } else if (value === 'pass') {
            return uuidv4()
        }
    }

    createNewCustomer = async (email, pass) => {
        const Timestamp = Math.floor(Date.now() / 1000);

        await this.firstName.fill('TestCustomer')
        await this.lastName.fill(Timestamp.toString())
        await this.loginFill.fill(email)
        await this.passFill.fill(pass)
        await this.passConfirmFill.fill(pass)
        await this.CreateButton.click()
    }

    createAnExistingUser = async (existingUser) => {
        const Timestamp = Math.floor(Date.now() / 1000);

        await this.firstName.fill('TestCustomer')
        await this.lastName.fill(Timestamp.toString())
        await this.loginFill.fill(existingUser.email)
        await this.passFill.fill(existingUser.pass)
        await this.passConfirmFill.fill(existingUser.pass)
        await this.CreateButton.click()
    }

    getUnsuccessfulMessageAfterRegistration = async () => {
        return this.existingAccountMessage.textContent()

    }

}
