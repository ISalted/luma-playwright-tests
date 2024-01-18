import { Page } from "@playwright/test"

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

        this.addToCartButton = (inputLiNumb: number) => {
            return this.page.locator('.widget-product-grid').locator('li').nth(inputLiNumb).getByRole('button', { name: 'Add to Cart' })
        }

        this.alertMessage = page.getByRole('alert').filter({ hasText: 'You added ' })
    }

    addToBasketFromGrid = async (inputLiNumb, inputSize, inputCollor) => {
        await this.sizeButton(inputLiNumb, inputSize).click()
        await this.collorButton(inputLiNumb, inputCollor).click();
        await this.addToCartButton(inputLiNumb).click();
        await this.alertMessage.waitFor()
    }
}
