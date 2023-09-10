import { expect } from "@playwright/test";

export class SignInPage {
    constructor(page) {
        this.page = page

        this.authorizationButton = page.locator('(//*[@class="authorization-link"])[1]');
        this.loginFill = page.locator('(//*[@name="login[username]"])');
        this.passFill = page.locator('(//*[@name="login[password]"])');
        this.signInButton = page.locator('(//*[@class="action login primary"])');
    }

    login = async (signInData) => {
        await this.authorizationButton.click()
        await this.loginFill.fill(signInData.email)
        await this.passFill.fill(signInData.pass)
        await this.signInButton.click()
        await this.page.waitForLoadState('domcontentloaded');
    }


}
