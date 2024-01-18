import { Page, expect } from "@playwright/test"
import { HelperBase } from "./helpers/helperBase"

export class MainPage extends HelperBase {
    sizeButton: any;
    collorButton: any;
    addToCartButton: any;
    alertMessage: any;

    constructor(page: Page) {
        super(page)
        this.sizeButton = (inputLiNumb, inputSize) => {
            return this.page.locator('.widget-product-grid').locator('li').nth(inputLiNumb).getByLabel(inputSize, { exact: true })
        };

        this.collorButton = (inputLiNumb, inputCollor) => {
            return this.page.locator('.widget-product-grid').locator('li').nth(inputLiNumb).getByLabel('Color').getByLabel(inputCollor)
        }

        this.addToCartButton = (inputLiNumb) => {
            return this.page.locator('.widget-product-grid').locator('li').nth(inputLiNumb).getByRole('button', { name: 'Add to Cart' })
        }

        this.alertMessage = page.getByRole('alert').filter({ hasText: 'You added ' })
    }

    visitMainPage = async () => {
        await this.page.goto('/')
    }

    addToBasketFromMainPage = async (inputLiNumb, inputSize, inputCollor) => {
        let counter = await this.inHeader.getBasketCounter();
        await this.inProductGrid.addToBasketFromGrid(inputLiNumb, inputSize, inputCollor)
        counter++;
        await this.inHeader.getBasketCounter(counter)
    }
}
