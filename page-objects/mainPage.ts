import { Page, expect } from "@playwright/test"
import { HelperBase } from "./helpers/helperBase"

export class MainPage extends HelperBase {
    sizeButton: (liNumbC: any, sizeC: any) => Promise<void>;
    addToCartButton: any;
    alertMessage: any;

    constructor(page: Page) {
        super(page)
        this.sizeButton = (liNumbC, sizeC) => {
            return this.page.locator(`(//*[@class="swatch-attribute size"])[${liNumbC}]//*[@aria-label="${sizeC}"]`).click();

        };
        this.addToCartButton = this.page.locator("(//*[@title='Add to Cart'])")
        this.alertMessage = page.getByRole('alert').filter({ hasText: 'You added ' })
    }

    visitMainePage = async () => {
        await this.page.goto('/')
    }

    addToBasket = async (liNumb, size, collor) => {
        let counter = await this.onHeader.getBasketCounter();
        if (isNaN(counter)) counter = 0;

        await this.sizeButton(liNumb,size);
        await this.page.getByLabel(collor).click();
        await this.addToCartButton.nth(liNumb-1).click();
        counter++;
        await this.alertMessage.waitFor()

        // await this.page.waitForFunction((value) => {
        //     const counterElement = document.querySelector('[class="counter-number"]');

        //     if (counterElement) {
        //         return counterElement.textContent === value;
        //     } else {
        //         console.error("Element not found");
        //         return false;
        //     }
        // }, counter.toString(), {timeout : 3000});
        // const actualResult = counter
        // const expectedResult = await this.headerPage.getBasketCounter()
        // expect(actualResult).toBe(expectedResult)
    }
}
