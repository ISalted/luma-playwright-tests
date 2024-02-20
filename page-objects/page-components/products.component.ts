import { th } from "@faker-js/faker";
import { BasePage } from "../helpers/basePage";
import { step } from "../helpers/step";
import { HeaderElements } from "./header.component"

export class ProductGrid extends BasePage {

    private widgetProductGrid: any = this.page.locator('.product-items').locator('li')

    public sizeButtons = (productIndex:number) => {
        return this.page
                .locator('.product-items')
                .locator('li').nth(productIndex)
                .getByRole('listbox', { name: 'Size' })
                .getByRole('option')
    };

    public collorButtons = (productIndex: number) => {
        return this.page
                .locator('.product-items')
                .locator('li')
                .nth(productIndex)
                .getByRole('listbox', { name: 'Color' })
                .getByRole('option')
    }

    public addToCartButton = (productIndex: number) => {
        return this.page
                .locator('.product-items')
                .locator('li')
                .nth(productIndex)
                .getByRole('button', { name: 'Add to Cart' })
    }

    public productItemName: any = (inputLiNumb: number) => {
        return this.page
                .locator('.product-items')
                .locator('li')
                .nth(inputLiNumb)
                .locator('.product-item-name')
    }


    private async addProductToBasket(productIndex: number, sizeIndex?, colorIndex?){
        if (sizeIndex!== undefined){
            await this.sizeButtons(productIndex).nth(sizeIndex).click()
            await this.collorButtons(productIndex).nth(colorIndex).click()
            await this.addToCartButton(productIndex).click()
            await this.alertMessage.waitFor()
        } else {
            let countOfSizeOption = await this.sizeButtons(productIndex).count()
            let countOfColorOption = await this.collorButtons(productIndex).count()

            await this.sizeButtons(productIndex).nth(this.getRandomNth(countOfSizeOption)).click()
            await this.collorButtons(productIndex).nth(this.getRandomNth(countOfColorOption)).click()
            await this.addToCartButton(productIndex).click()
            await this.alertMessage.waitFor()
        }
    }

    private getProductItemName = (inputLiNumb: number) => {
        return this.productItemName(inputLiNumb).textContent()
    }

    alertMessage = this.page.getByRole('alert').filter({ hasText: 'You added ' })

    @step()
    async addToBasketAndReturnHisName(productIndex: number, sizeIndex?: number, colorIndex?: number) {
        let inHeader = new HeaderElements(this.page)
        let counter = await inHeader.getBasketCounter();
        await this.addProductToBasket(productIndex, sizeIndex, colorIndex)
        counter++;

        try {
            await inHeader.getBasketCounter(counter)
        } catch (error) {
            this.addProductToBasket(productIndex, sizeIndex, colorIndex)
            counter++;
        }
        await inHeader.getBasketCounter(counter)
        let getProductItemName = await this.getProductItemName(productIndex)
        return getProductItemName.replace(/^[^a-zA-Z]*([a-zA-Z].*[a-zA-Z])[^a-zA-Z]*$/, '$1')
    }
}
