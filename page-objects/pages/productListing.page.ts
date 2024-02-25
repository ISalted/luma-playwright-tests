import { step } from "../helpers/step";
import { Components } from "../page-components/components";

export class ProductListing extends Components {
    public pagePath = '/men/tops-men/jackets-men.html'

    private sortByDropdown = this.page.getByLabel('Sort By')

    @step()
    async sortProductBy(value) {
        await this.page.getByRole('combobox', { name: 'Sort By' }).selectOption(value)
        await this.page.waitForTimeout(1000)
    }




}
