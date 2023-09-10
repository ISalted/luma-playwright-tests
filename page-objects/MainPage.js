import { expect } from "@playwright/test"
import { HeaderPage } from "./HeaderPage";

export class MainPage {
    constructor(page) {
        this.page = page
        this.headerPage = new HeaderPage(this.page)
        this.sizeButton = (liNumbC, sizeC) => {
            return this.page.locator('(//*[@class="swatch-attribute size"])[' + liNumbC + ']//*[@aria-label="' + sizeC + '"]').click();
        };
        this.addToCartButton = this.page.locator("(//*[@title='Add to Cart'])")
    }

    visitMainePage = async () => {
        await this.page.goto('/')
    }

    addToBasket = async (liNumb, size, collor) => {
        let counter = await this.headerPage.getBasketCounter();
        if (isNaN(counter)) counter = 0;

        await this.sizeButton(liNumb,size);
        await this.page.getByLabel(collor).click();
        await this.addToCartButton.nth(liNumb-1).click();
        counter++;
        await this.headerPage.basketCounterButton.waitFor()

        await this.page.waitForFunction((value) => {
            return document.querySelector('[class="counter-number"]').textContent === value;
        }, counter.toString(), {timeout : 3000});
        const actualResult = counter
        const expectedResult = await this.headerPage.getBasketCounter()

        expect(actualResult).toBe(expectedResult)
    }
}
