import { step } from "../helpers/step";
import { Components } from "../page-components/components";

export class SignInPage extends Components {
    public pagePath = '/customer/account/login'

    private loginFld = this.page.getByRole('textbox', {name: 'Email'})
    private passFld = this.page.getByRole('textbox', { name: 'Password*' })
    private signInBtn = this.page.getByRole('button', { name: 'Sign In' })
    private alertMsg = this.page.getByRole('alert').filter({ hasText: 'The account sign-in was incorrect' })
    private emailErrorMsg = this.page.locator('#email-error')
    private passErrorMsg = this.page.locator('#pass-error')


    @step()
    async fillDataAndSignIn(signInData, clearCookie?: 'clearCoockie') {
        if (clearCookie == 'clearCoockie') {
            await this.clearCookies()
        }
        await this.loginFld.type(signInData.email, { delay: 30 })
        await this.passFld.type(signInData.pass, { delay: 30 })
        await this.signInBtn.click()

        await this.inHeader.welcomeBtn.waitFor({ state: "attached" })
    }

    @step()
    async fillWrongData (signInData, clearCookie?) {
        if (clearCookie == 'Clear Coockie') {
            await this.clearCookies()
        }
        await this.loginFld.type(signInData.email, { delay: 30 })
        await this.passFld.type(signInData.pass, { delay: 30 })
        await this.signInBtn.click()
    }

    @step()
    async getUnsuccessfulMsg () {
        await this.alertMsg.waitFor()
        return await this.alertMsg.textContent()
    }

    @step()
    async getEmailErrorMsg() {
        await this.emailErrorMsg.waitFor()
        return await this.emailErrorMsg.textContent()
    }

    @step()
    async getPassErrorMsg() {
        await this.passErrorMsg.waitFor()
        return await this.passErrorMsg.textContent()
    }

}
