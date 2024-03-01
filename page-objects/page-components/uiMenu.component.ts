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
    private root: Locator = this.page.getByRole('navigation')
    public pageTitle: Locator = this.page.locator('.page-title')

    @step()
    async selectMenuItem<X extends ZeroLevel, Y extends FirstLevel<X>, S extends SecondLevel<Y>>(zeroLevelOfMenuItems: X, firstLevelOfMenuItems?: Y, secondLevelOfMenuItems?: S) {
        let pageTitleWrapper: Locator

        if (secondLevelOfMenuItems !== undefined) {
            await this.root.getByRole('menuitem', { name: ` ${zeroLevelOfMenuItems}`, exact: true }).hover()
            await this.root.getByRole('menuitem', { name: firstLevelOfMenuItems }).hover()
            await this.root.getByRole('menuitem', { name: secondLevelOfMenuItems }).click()
            pageTitleWrapper = this.pageTitle.filter({ hasText: secondLevelOfMenuItems })
        } else if (firstLevelOfMenuItems !== undefined){
            await this.root.getByRole('menuitem', { name: ` ${zeroLevelOfMenuItems}` }).hover()
            await this.root.getByRole('menuitem', { name: firstLevelOfMenuItems }).click()
            pageTitleWrapper = this.pageTitle.filter({ hasText: firstLevelOfMenuItems })
        } else {
            await this.root.getByRole('menuitem', { name: ` ${zeroLevelOfMenuItems}` }).click()
            pageTitleWrapper = this.pageTitle.filter({ hasText: zeroLevelOfMenuItems })
        }
        await pageTitleWrapper.waitFor()
        await this.page.waitForLoadState('networkidle', {timeout: 2000})
    }
}





