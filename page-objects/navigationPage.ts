import { Page } from "@playwright/test"
import { HelperBase } from "./helpers/helperBase"

// export function NavigationFormPages(page: Page) {

//     const formLayoutsPage = async () => {
//         await page.getByText('Forms').click()
//         await page.getByText('Form Layouts').click()
//     }

//     return {
//         formLayoutsPage: formLayoutsPage,
//     }
// }

export class NavigationPage extends HelperBase {
    readonly menuItems: { main: string; nested: string[] }[];

    constructor(page: Page) {
        super(page)
        this.menuItems = [
            {
                main: 'Forms',
                nested: ['Form Layouts', 'Datepicker']
            },
            {
                main: 'Modal & Overlays',
                nested: ['Toastr', 'Tooltip']
            },
            {
                main: 'Tables & Data',
                nested: ['Smart Table', 'Tree Grid']
            }
        ]
    }

    public async selectFromMenuItem(nestedMenuItemTitle: string) {
        const foundItem = this.menuItems.find(item => item.nested.includes(nestedMenuItemTitle));
        await this.waitForNumberOfSeconds(5)

        if (foundItem) {
            const groupMenuItem = this.page.getByTitle(foundItem.main)
            const expandedState = await groupMenuItem.getAttribute('aria-expanded')
            if (expandedState == 'false') {
                await this.page.getByTitle(foundItem.main).click()
            }
            await this.page.getByText(nestedMenuItemTitle).click()
        } else {
            console.error(`The menu item ${nestedMenuItemTitle} was not found.`);
            await this.page.getByText(nestedMenuItemTitle).click()
        }
    }
}





