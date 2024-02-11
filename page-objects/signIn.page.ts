import { Page } from "@playwright/test";
import { BasePage } from "./helpers/basePage"

export class SignInPage extends BasePage {
    readonly loginFill = this.page.locator('.block-content').getByLabel('Email', { exact: true });
    readonly passFill = this.page.locator('.block-content').getByLabel('Password', { exact: true });
    readonly signInButton = this.page.getByRole('button', { name: 'Sign In' });
    readonly alertMessage = this.page.getByRole('alert').filter({ hasText: 'The account sign-in was incorrect' });
    
    constructor(page: Page) {
        super(page)
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
