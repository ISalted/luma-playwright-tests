import { Page } from "@playwright/test"
import { step } from "../helpers/step";

export class ProductGrid {
    constructor(protected page: Page) { }


    public widgetProductGrid:any = this.page.locator('.widget-product-grid').locator('li')
    public sizeButton = (inputLiNumb, inputSize) => {
        return this.widgetProductGrid.nth(inputLiNumb).getByLabel(inputSize, { exact: true })
    };
    public collorButton = (inputLiNumb: number, inputCollor: string) => {
        return this.widgetProductGrid.nth(inputLiNumb).getByLabel('Color').getByLabel(inputCollor)
    }
    public addToCartButton = (inputLiNumb: number) => {
        return this.widgetProductGrid.nth(inputLiNumb).getByRole('button', { name: 'Add to Cart' })
    }
    public productItemName = (inputLiNumb: number) => {
        return this.widgetProductGrid.nth(inputLiNumb).locator('.product-item-name')
    }

    alertMessage = this.page.getByRole('alert').filter({ hasText: 'You added ' })

    @step()
    async addToBasketFromGridAndReturnHisName (inputLiNumb, inputSize, inputCollor) {
        await this.sizeButton(inputLiNumb, inputSize).click()
        await this.collorButton(inputLiNumb, inputCollor).click();
        await this.addToCartButton(inputLiNumb).click();
        await this.alertMessage.waitFor()
        let getProductItemName:any = await this.productItemName(inputLiNumb).textContent()
        return getProductItemName.replace(/^[^a-zA-Z]*([a-zA-Z].*[a-zA-Z])[^a-zA-Z]*$/, '$1')
    }
}
