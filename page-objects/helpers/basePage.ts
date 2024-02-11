import { Page } from "@playwright/test"
import { HeaderElements } from "../persistentElements/header.elements"
import { UiMenuElements } from "../persistentElements/uiMenu.elements"
import { ProductGrid } from "../persistentElements/products.grid"
import { footerElements } from "../persistentElements/footer.elements"

import { v4 as uuidv4 } from "uuid";


export abstract class BasePage {
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
