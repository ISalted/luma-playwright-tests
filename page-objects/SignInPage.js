import { expect } from "@playwright/test";
import { HeaderPage } from "./HeaderPage";

export class SignInPage {
    constructor(page) {
        this.page = page
        this.headerPage = new HeaderPage(this.page)
        this.loginFill = page.locator('(//*[@name="login[username]"])');
        this.passFill = page.locator('(//*[@name="login[password]"])');
        this.signInButton = page.locator('(//*[@class="action login primary"])');
        this.alertMessage = page.locator('//*[@data-bind="html: $parent.prepareMessageForHtml(message.text)"]')
    }

    login = async (signInData) => {
        await this.headerPage.authorizationButton.click()
        await this.loginFill.type(signInData.email, { delay: 30 })
        await this.passFill.type(signInData.pass, { delay: 30 })
        await this.signInButton.click()
        await this.page.waitForTimeout(3000);
        return await this.headerPage.welcomeButton.textContent()
    }

    loginWrongData = async (signInData) => {
        await this.headerPage.authorizationButton.click()
        await this.loginFill.type(signInData.email, { delay: 30 })
        await this.passFill.type(signInData.pass, { delay: 30 })
        await this.signInButton.click()
        await this.page.waitForTimeout(3000);
        return await this.alertMessage.textContent()
    }


}
