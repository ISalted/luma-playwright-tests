import { Page } from "@playwright/test"
import { HeaderPage } from "../persistentElements/headerElements"
import { UiMenuPage } from "../persistentElements/uiMenuElements"

export abstract class HelperBase {
    constructor(protected page: Page) { }

    inHeader = new HeaderPage(this.page)
    inUiMenu = new UiMenuPage(this.page)


    async waitForNumberOfSeconds(timeInSeconds: number) {
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }

    async clearCookies(){
        await this.page.context().clearCookies()
        await this.page.reload()
    }


}
