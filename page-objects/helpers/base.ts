import { Page } from "@playwright/test"
import { HeaderElements } from "../components/header.component"
import { UiMenuElements } from "../components/uiMenu.component"
import { ProductGrid } from "../components/products.component"
import { footerElements } from "../components/footer.component"

export abstract class Base {
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

