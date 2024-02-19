import { step } from "../helpers/step";
import { Components } from "../page-components/components";

export class SignInPage extends Components {
    public pagePath = '/customer/account/login'

    private loginFill = this.page.getByRole('textbox', {name: 'Email'})
    private passFill = this.page.getByRole('textbox', { name: 'Password*' })
    private signInButton = this.page.getByRole('button', { name: 'Sign In' })
    private alertMessage = this.page.getByRole('alert').filter({ hasText: 'The account sign-in was incorrect' })


    @step()
    async signInFromHeader (signInData, clearCookie?) {
        if (clearCookie == 'Clear Coockie') {
            await this.clearCookies()
        }
        await this.loginFill.type(signInData.email, { delay: 30 })
        await this.passFill.type(signInData.pass, { delay: 30 })
        await this.signInButton.click()
        await this.inHeader.welcomeButton.waitFor({ state: "attached" })
    }
    @step()
    async signInWithWrongData (signInData: { email: string; pass: string }, clearCookie?) {
        if (clearCookie == 'Clear Coockie') {
            await this.clearCookies()
        }
        await this.loginFill.type(signInData.email, { delay: 30 })
        await this.passFill.type(signInData.pass, { delay: 30 })
        await this.signInButton.click()
    }
    @step()
    async getUnsuccessfulMessageAfterSignIn () {
        return await this.alertMessage.textContent()
    }



}
