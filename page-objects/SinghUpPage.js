import { expect } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";

export class SinghUpPage {
    constructor(page) {
        this.page = page
        this.firstName = page.locator('//*[@id="firstname"]');
        this.lastName = page.locator('//*[@id="lastname"]');
        this.loginFill = page.locator('//*[@id="email_address"]');
        this.passFill = page.locator('//*[@id="password"]');
        this.passConfirmFill = page.locator('//*[@id="password-confirmation"]');
        this.CreateButton = page.locator('//*[@class="action submit primary"]');
        this.succsessMessage = page.locator('//*[@class="message-success success message"]')

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
        await expect(this.succsessMessage).toBeVisible();
    }

}
