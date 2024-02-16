import { step } from "../helpers/step";
import { Base } from "../helpers/base"

export class MenJacketsPage extends Base {
    public pagePath = '/men/tops-men/jackets-men.html'

    private sortByDropdownButton = this.page.locator('(//*[@class="sorter-options"])[1]')
    private productTitle = this.page.locator('(//*[@class="product-item-link"])')

    @step()
    async visitMenJacketsPage () {
        await this.page.goto('/men/tops-men/jackets-men.html')
    }

    @step()
    async sortByCheapest (){
        await this.visitMenJacketsPage()
        const productTitlesBeforeSorting = await this.productTitle.allInnerTexts()
        await this.sortByDropdownButton.selectOption('price')
        await this.page.waitForTimeout(3000);
        const productTitlesAfterSorting = await this.productTitle.allInnerTexts()
    }
}
