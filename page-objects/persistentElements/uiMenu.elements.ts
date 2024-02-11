import { Locator, Page } from "@playwright/test"
import { zeroLevelOfMenuItem, firstLevelOfMenuItem, secondLevelOfMenuItem } from "../../data/uiMenuData"


export class UiMenuElements {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly getItemFromLevel0: { WhatIsNew: string; Women: string; Men: string; Gear: string; Training: string; Sale: string; };
    readonly getItemFromLevel1: { Tops: string; Bottoms: string; Bags: string; FitnessEquipment: string; Watches: string; VideoDownload: string; };
    readonly getItemFromLevel2: { Jackets: string; HoodiesAndSweatshirts: string; Tees: string; BrasAndTanks: string; Tanks: string; VideoDownload: string; Shorts: string; };

    constructor(page: Page) {
        this.page = page
        this.pageTitle = this.page.locator('.page-title')
        this.getItemFromLevel0 = zeroLevelOfMenuItem
        this.getItemFromLevel1 = firstLevelOfMenuItem
        this.getItemFromLevel2 = secondLevelOfMenuItem

    }

    selectMenuItem = async (zeroLevelOfMenuItem: string, firstLevelOfMenuItem?: string, secondLevelOfMenuItem?: string) => {
        let pageTitleWrapper: Locator


        if (secondLevelOfMenuItem !== undefined) {
            await this.page.locator(`//*[@role="presentation"]//*[contains(text(),"${zeroLevelOfMenuItem}")]`).hover()
            await this.page.getByRole('menuitem', { name: firstLevelOfMenuItem }).hover()
            await this.page.getByRole('menuitem', { name: secondLevelOfMenuItem }).click()
            pageTitleWrapper = this.pageTitle.filter({ hasText: secondLevelOfMenuItem })
        } else if (firstLevelOfMenuItem !== undefined){
            await this.page.locator(`//*[@role="presentation"]//*[contains(text(),"${zeroLevelOfMenuItem}")]`).hover()
            await this.page.getByRole('menuitem', { name: zeroLevelOfMenuItem }).hover()
            await this.page.getByRole('menuitem', { name: firstLevelOfMenuItem }).click()
            pageTitleWrapper = this.pageTitle.filter({ hasText: firstLevelOfMenuItem })
        } else {
            await this.page.locator(`//*[@role="presentation"]//*[contains(text(),"${zeroLevelOfMenuItem}")]`).click()
            pageTitleWrapper = this.pageTitle.filter({ hasText: zeroLevelOfMenuItem })
        }
        await pageTitleWrapper.waitFor()
    }

    getWhatIsNewPage = async () => {
        await this.selectMenuItem(this.getItemFromLevel0.WhatIsNew)
    }


    // readonly menuItems: { level0: string; level1: string[] }[];

    // constructor(page: Page) {
    //     super(page)
    //     this.menuItems = [
    //         {
    //             level0: 'Women',
    //             level1: ['Tops', 'Bottoms']
    //         },
    //         {
    //             level0: 'Men',
    //             level1: ['Tops', 'Bottoms']
    //         },
    //         {
    //             level0: 'Gear',
    //             level1: ['Bags', 'Fitness Equipment', 'Watches']
    //         }
    //     ]
    // }

    // public async selectFromMenuItem(nestedMenuItemTitle: string) {
    //     const foundItem = this.menuItems.find(item => item.level1.includes(nestedMenuItemTitle));
    //     await this.waitForNumberOfSeconds(5)

    //     if (foundItem) {
    //         const groupMenuItem = this.page.getByTitle(foundItem.level0)
    //         const expandedState = await groupMenuItem.getAttribute('aria-expanded')
    //         if (expandedState == 'false') {
    //             await this.page.getByTitle(foundItem.level0).click()
    //         }
    //         await this.page.getByText(nestedMenuItemTitle).click()
    //     } else {
    //         console.error(`The menu item ${nestedMenuItemTitle} was not found.`);
    //         await this.page.getByText(nestedMenuItemTitle).click()
    //     }
    // }

}





