import { Page } from "@playwright/test"
import { HeaderElements } from "../persistentElements/headerElements"
import { UiMenuElements } from "../persistentElements/uiMenuElements"
import { ProductGrid } from "../persistentElements/productsgrid"
import { footerElements } from "../persistentElements/footerElements"

import { v4 as uuidv4 } from "uuid";


export abstract class HelperBase {
    constructor(protected page: Page) { }

    inHeader = new HeaderElements(this.page)
    inUiMenu = new UiMenuElements(this.page)
    inProductGrid = new ProductGrid(this.page)
    inFooter = new footerElements(this.page)

   async clearCookies(){
        await this.page.context().clearCookies()
        await this.page.reload()
    }
}
