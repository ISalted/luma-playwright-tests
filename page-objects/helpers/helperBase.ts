import { Page } from "@playwright/test"
import { HeaderPage } from "../headerPage"
export abstract class HelperBase {
    constructor(protected page: Page) { }

    onHeader = new HeaderPage(this.page)

    async waitForNumberOfSeconds(timeInSeconds: number) {
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }

    async clearCookies(){
        await this.page.context().clearCookies()
        await this.page.reload()
    }


}
