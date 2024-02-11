import { Page } from "@playwright/test"
// import { BasePage } from "../../page-objects/helpers/basePage"

export abstract class BasePage {
    constructor(protected page: Page) { }
}

export class ProductGrid extends BasePage {

    readonly widgetProductGrid:any = this.page.locator('.widget-product-grid').locator('li')
    readonly sizeButton = (inputLiNumb, inputSize) => {
        return this.widgetProductGrid.nth(inputLiNumb).getByLabel(inputSize, { exact: true })
    };
    readonly collorButton = (inputLiNumb: number, inputCollor: string) => {
        return this.widgetProductGrid.nth(inputLiNumb).getByLabel('Color').getByLabel(inputCollor)
    }
    readonly addToCartButton = (inputLiNumb: number) => {
        return this.widgetProductGrid.nth(inputLiNumb).getByRole('button', { name: 'Add to Cart' })
    }
    readonly productItemName = (inputLiNumb: number) => {
        return this.widgetProductGrid.nth(inputLiNumb).locator('.product-item-name')
    }

    alertMessage = this.page.getByRole('alert').filter({ hasText: 'You added ' })

    constructor(page: Page) {
        super(page)
    }

    addToBasketFromGridAndReturnHisName = async (inputLiNumb, inputSize, inputCollor) => {
        await this.sizeButton(inputLiNumb, inputSize).click()
        await this.collorButton(inputLiNumb, inputCollor).click();
        await this.addToCartButton(inputLiNumb).click();
        await this.alertMessage.waitFor()
        let getProductItemName:any = await this.productItemName(inputLiNumb).textContent()
        return getProductItemName.replace(/^[^a-zA-Z]*([a-zA-Z].*[a-zA-Z])[^a-zA-Z]*$/, '$1')
    }
}
