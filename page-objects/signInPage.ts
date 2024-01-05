import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helpers/helperBase"

export class SignInPage extends HelperBase {
    loginFill: Locator;
    passFill: any;
    signInButton: any;
    alertMessage: any;
    constructor(page: Page) {
        super(page)
        this.loginFill = page.getByLabel('Email')
        this.passFill = page.getByLabel('Password')
        this.signInButton = page.getByRole('button', { name: 'Sign In' })
        this.alertMessage = page.getByRole('alert').filter({ hasText: 'The account sign-in was incorrect' })
    }

    loginFromHeader = async (signInData, clearCookie?) => {
        if (clearCookie == 'Clear Coockie') {
            await this.clearCookies()
        }
        await this.loginFill.type(signInData.email, { delay: 30 })
        await this.passFill.type(signInData.pass, { delay: 30 })
        await this.signInButton.click()
        await this.inHeader.welcomeButton.waitFor({ state: "attached" })
    }

    loginWithWrongData = async (signInData: { email: string; pass: string }, clearCookie?) => {
        if (clearCookie == 'Clear Coockie') {
            await this.clearCookies()
        }
        await this.loginFill.type(signInData.email, { delay: 30 })
        await this.passFill.type(signInData.pass, { delay: 30 })
        await this.signInButton.click()
    }

    getUnsuccessfulMessageAfterSignIn = async () => {
        return await this.alertMessage.textContent()
    }

}
