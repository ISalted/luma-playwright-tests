import { Page } from "@playwright/test"

export class ProductGrid {
    readonly page: Page

    readonly widgetProductGrid: any;
    readonly sizeButton: any;
    readonly collorButton: any;
    readonly addToCartButton: any;
    readonly productItemName: any;

    alertMessage: any;


    constructor(page: Page) {
        this.page = page
        this.widgetProductGrid = this.page.locator('.widget-product-grid').locator('li')

        this.sizeButton = (inputLiNumb, inputSize) => {
            return this.widgetProductGrid.nth(inputLiNumb).getByLabel(inputSize, { exact: true })
        };

        this.collorButton = (inputLiNumb: number, inputCollor: string) => {
            return this.widgetProductGrid.nth(inputLiNumb).getByLabel('Color').getByLabel(inputCollor)
        }

        this.addToCartButton = (inputLiNumb: number) => {
            return this.widgetProductGrid.nth(inputLiNumb).getByRole('button', { name: 'Add to Cart' })
        }

        this.productItemName = (inputLiNumb: number) => {
            return this.widgetProductGrid.nth(inputLiNumb).locator('.product-item-name')
        }

        this.alertMessage = page.getByRole('alert').filter({ hasText: 'You added ' })
    }

    addToBasketFromGridAndReturnHisName = async (inputLiNumb, inputSize, inputCollor) => {
        await this.sizeButton(inputLiNumb, inputSize).click()
        await this.collorButton(inputLiNumb, inputCollor).click();
        await this.addToCartButton(inputLiNumb).click();
        await this.alertMessage.waitFor()
        let getProductItemName = await this.productItemName(inputLiNumb).textContent()
        return getProductItemName.replace(/^[^a-zA-Z]*([a-zA-Z].*[a-zA-Z])[^a-zA-Z]*$/, '$1')
    }
}
