import { step } from "../helpers/step";
import { Components } from "../page-components/components";

export class ProductListing extends Components {
    public pagePath = '/men/tops-men/jackets-men.html'

    private sortByDropdown = this.page.getByRole('combobox', { name: 'Sort By' })
    private searchNoticeMessage = this.page.locator('.message.notice')

    @step()
    async sortProductBy(value) {
        await this.sortByDropdown.selectOption(value)
        await this.page.waitForTimeout(1000)
    }

    @step()
    async getNoticeMessage() {
        await this.searchNoticeMessage.waitFor({ state: 'visible' })
        return await this.searchNoticeMessage.textContent()
    }





}
