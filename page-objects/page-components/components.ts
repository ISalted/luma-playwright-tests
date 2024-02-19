import { BasePage } from "../helpers/basePage";

import { HeaderElements } from "../page-components/header.component"
import { UiMenuElements } from "../page-components/uiMenu.component"
import { ProductGrid } from "../page-components/products.component"
import { footerElements } from "../page-components/footer.component"

export abstract class Components extends BasePage {
    inHeader = new HeaderElements(this.page)
    inFooter = new footerElements(this.page)
    inUiMenu = new UiMenuElements(this.page)
    inProductGrid = new ProductGrid(this.page)
}
