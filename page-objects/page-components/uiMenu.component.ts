import { Locator } from "@playwright/test"
import { step } from "../helpers/step";

import { ZERO_LEVEL_OF_MENU_ITEM, FIRST_LEVEL_OF_MENU_ITEM, SECOND_LEVEL_OF_MENU_ITEM } from "../../data/uiMenuData"
import { BasePage } from "../helpers/basePage";


export class UiMenuElements extends BasePage {
    public pageTitle = this.page.locator('.page-title')
    public getItemFromLevel0: { WhatIsNew: string; Women: string; Men: string; Gear: string; Training: string; Sale: string; } = ZERO_LEVEL_OF_MENU_ITEM
    public getItemFromLevel1: { Tops: string; Bottoms: string; Bags: string; FitnessEquipment: string; Watches: string; VideoDownload: string; } = FIRST_LEVEL_OF_MENU_ITEM
    public getItemFromLevel2: { Jackets: string; HoodiesAndSweatshirts: string; Tees: string; BrasAndTanks: string; Tanks: string; VideoDownload: string; Shorts: string; } = SECOND_LEVEL_OF_MENU_ITEM


    @step()
    async selectMenuItem (zeroLevelOfMenuItems: string, firstLevelOfMenuItems?: string, secondLevelOfMenuItems?: string) {
        let pageTitleWrapper: Locator


        if (secondLevelOfMenuItems !== undefined) {
            await this.page.getByRole('menuitem', { name: zeroLevelOfMenuItems }).hover()
            await this.page.getByRole('menuitem', { name: firstLevelOfMenuItems }).hover()
            await this.page.getByRole('menuitem', { name: secondLevelOfMenuItems }).click()
            pageTitleWrapper = this.pageTitle.filter({ hasText: secondLevelOfMenuItems })
        } else if (firstLevelOfMenuItems !== undefined){
            await this.page.getByRole('menuitem', { name: zeroLevelOfMenuItems }).hover()
            await this.page.getByRole('menuitem', { name: zeroLevelOfMenuItems }).hover()
            await this.page.getByRole('menuitem', { name: firstLevelOfMenuItems }).click()
            pageTitleWrapper = this.pageTitle.filter({ hasText: firstLevelOfMenuItems })
        } else {
            await this.page.getByRole('menuitem', { name: zeroLevelOfMenuItems }).click()
            pageTitleWrapper = this.pageTitle.filter({ hasText: zeroLevelOfMenuItems })
        }
        await pageTitleWrapper.waitFor()
    }

    @step()
    async getWhatIsNewPage () {
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





