import { expect } from "@playwright/test";

export class HeaderPage {
    constructor(page) {
        this.page = page
        this.authorizationButton = page.locator('(//*[@class="authorization-link"])[1]');
        this.welcomeButton = page.locator('(//*[@class="greet welcome"])[1]/span');

        this.basketCounterButton = page.locator('//*[@class="counter-number"]');
        this.basketCards = page.locator('//*[@id="mini-cart"]/li')

        this.openItemInCard = page.locator('//*[@class="action showcart"]')
        this.closeItemInCard = page.locator('//*[@class="action showcart active"]')
        this.deleteItemButton = page.locator('(//*[@class="action delete"])[1]');
        this.acceptDeleteItemButton = page.locator('//*[@class="action-primary action-accept"]');
    }

    getBasketCounter = async () => {
        return parseInt(await this.basketCounterButton.textContent(), 10)
    }

    clearBasketFromHeader = async () => {
        await this.page.waitForLoadState('domcontentloaded');
        let itemsBeforeRemoval = await this.basketCards.count()

        if (itemsBeforeRemoval === 0) {
            // skip
        } else {
            await this.openItemInCard.click()
            await this.deleteItemButton.click()
            await this.acceptDeleteItemButton.click()
            await this.closeItemInCard.click()
            itemsBeforeRemoval--;

            await this.page.waitForFunction(
                (expectedCount) => {
                    const liElements = Array.from(document.querySelectorAll('[id="mini-cart"] li'));
                    return liElements.length === expectedCount;
                }, itemsBeforeRemoval
            );
            await this.clearBasketFromHeader()
        }
        const expectedResult = 0
        const actualResult = await this.basketCards.count()
    }
}





