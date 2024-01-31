import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helpers/helperBase"

export class SignInPage extends HelperBase {
    readonly loginFill: Locator;
    readonly passFill: Locator;
    readonly signInButton: Locator;
    readonly alertMessage: Locator;
    constructor(page: Page) {
        super(page)
        this.loginFill = page.locator('.block-content').getByLabel('Email', { exact: true })
        this.passFill = page.locator('.block-content').getByLabel('Password', { exact: true })
        this.signInButton = page.getByRole('button', { name: 'Sign In' })
        this.alertMessage = page.getByRole('alert').filter({ hasText: 'The account sign-in was incorrect' })
    }

    signInFromHeader = async (signInData, clearCookie?) => {
        if (clearCookie == 'Clear Coockie') {
            await this.clearCookies()
        }
        await this.loginFill.type(signInData.email, { delay: 30 })
        await this.passFill.type(signInData.pass, { delay: 30 })
        await this.signInButton.click()
        await this.inHeader.welcomeButton.waitFor({ state: "attached" })
    }

    signInWithWrongData = async (signInData: { email: string; pass: string }, clearCookie?) => {
        await this.page.waitForTimeout(3000)
        if (clearCookie == 'Clear Coockie') {
            await this.clearCookies()
        }
        await this.loginFill.type(signInData.email, { delay: 30 })
        await this.passFill.type(signInData.pass, { delay: 30 })
        await this.signInButton.click()
        // await this.page.reload()
    }

    getUnsuccessfulMessageAfterSignIn = async () => {
        return await this.alertMessage.textContent()
    }

}
