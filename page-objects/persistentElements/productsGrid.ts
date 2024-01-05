import { Page, expect } from "@playwright/test"
import { HelperBase } from "../helpers/helperBase"

export class ProductGrid {
    readonly page: Page

    sizeButton: any;
    collorButton: any;
    addToCartButton: any;
    alertMessage: any;

    constructor(page: Page) {
        this.page = page
        this.sizeButton = (inputLiNumb, inputSize) => {
            return this.page.locator('.widget-product-grid').locator('li').nth(inputLiNumb).getByLabel(inputSize, { exact: true })
        };

        this.collorButton = (inputLiNumb: number, inputCollor: string) => {
            return this.page.locator('.widget-product-grid').locator('li').nth(inputLiNumb).getByLabel('Color').getByLabel(inputCollor)
        }

        this.addToCartButton = () => {
            return this.page.locator('.widget-product-grid').locator('li').nth(0).getByRole('button', { name: 'Add to Cart' })
        }

        this.alertMessage = page.getByRole('alert').filter({ hasText: 'You added ' })
    }

    addToBasketFromGrid = async (inputLiNumb, inputSize, inputCollor, getBasketCounter) => {
        await this.page.pause()

        let counter = await getBasketCounter()
        console.log(getBasketCounter)


        await this.sizeButton().click()
        await this.page.getByLabel(inputCollor).click();
        await this.addToCartButton.nth(inputLiNumb - 1).click();
        counter++;
        await this.alertMessage.waitFor()
        // await this.inHeader.getBasketCounter(counter)

        // await this.page.waitForFunction((value) => {
        //     const counterElement = document.querySelector('[class="counter-number"]');

        //     if (counterElement) {
        //         return counterElement.textContent === value;
        //     } else {
        //         console.error("Element not found");
        //         return false;
        //     }
        // }, counter.toString(), {timeout : 3000});
        const actualResult = counter
        // const expectedResult = await this.inHeader.getBasketCounter()
        // expect(actualResult).toBe(expectedResult)
    }
}
