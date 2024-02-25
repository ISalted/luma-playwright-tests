import { Locator } from "@playwright/test"
import { step } from "../helpers/step";

import { BasePage } from "../helpers/basePage";

type ZeroLevel = 'WhatIsNew' | 'Women' | 'Men' | 'Gear' | 'Training' | 'Sale';

type FirstLevel<T extends ZeroLevel> =
    T extends 'Women' | 'Men' ? 'Tops' | 'Bottoms' :
    T extends 'Gear' ? 'Bags' | 'Fitness Equipment' | 'Watches' :
    T extends 'Training' ? 'VideoDownload' :
    never;

type SecondLevel<T extends FirstLevel<ZeroLevel>> =
    T extends 'Tops' ? 'Jackets' | 'Hoodies & Sweatshirts' | 'Tees' | 'Tanks' :
    T extends 'Bottoms' ? 'Pants' | 'Shorts' :
    never;

export class UiMenuElements extends BasePage {
    public pageTitle = this.page.locator('.page-title')

    @step()
    async selectMenuItem<X extends ZeroLevel, Y extends FirstLevel<X>, S extends SecondLevel<Y>>(zeroLevelOfMenuItems: X, firstLevelOfMenuItems?: Y, secondLevelOfMenuItems?: S) {
        let pageTitleWrapper: Locator

        if (secondLevelOfMenuItems !== undefined) {
            await this.page.getByRole('menuitem', { name: ` ${zeroLevelOfMenuItems}`, exact: true }).hover()
            await this.page.getByRole('menuitem', { name: firstLevelOfMenuItems }).hover()
            await this.page.getByRole('menuitem', { name: secondLevelOfMenuItems }).click()
            pageTitleWrapper = this.pageTitle.filter({ hasText: secondLevelOfMenuItems })
        } else if (firstLevelOfMenuItems !== undefined){
            await this.page.getByRole('menuitem', { name: ` ${zeroLevelOfMenuItems}` }).hover()
            await this.page.getByRole('menuitem', { name: firstLevelOfMenuItems }).click()
            pageTitleWrapper = this.pageTitle.filter({ hasText: firstLevelOfMenuItems })
        } else {
            await this.page.getByRole('menuitem', { name: ` ${zeroLevelOfMenuItems}` }).click()
            pageTitleWrapper = this.pageTitle.filter({ hasText: zeroLevelOfMenuItems })
        }
        await pageTitleWrapper.waitFor()
        await this.page.waitForLoadState('networkidle', {timeout: 2000})
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





