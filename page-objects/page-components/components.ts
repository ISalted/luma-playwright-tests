import { BasePage } from "../helpers/basePage";

import { HeaderElements } from "../page-components/header.component"
import { UiMenuElements } from "../page-components/uiMenu.component"
import { ProductGrid } from "./productGrid.component"
import { FooterElements } from "../page-components/footer.component"
import { FilterSidebar } from "./filterSidebar.component";

export abstract class Components extends BasePage {
    inHeader = new HeaderElements(this.page)
    inFooter = new FooterElements(this.page)
    inUiMenu = new UiMenuElements(this.page)
    inFilterSidebar = new FilterSidebar(this.page)
    inProductGrid = new ProductGrid(this.page)
}
