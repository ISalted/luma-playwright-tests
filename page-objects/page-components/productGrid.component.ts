import { BasePage } from "../helpers/basePage";
import { step } from "../helpers/step";
import { HeaderElements } from "./header.component"

export class ProductGrid extends BasePage {

    public alertMessage = this.page.getByRole('alert').filter({ hasText: 'You added ' })
    private listOfProductItem = this.page.locator('.product-items li')
    private productPrice:any = this.listOfProductItem.locator('.price')
    private productName: any = this.listOfProductItem.locator('.product-item-name')
    private productReviews: any = this.listOfProductItem.locator('.action.view')



    public sizeBtn = (productIndex:number) => this.listOfProductItem.nth(productIndex).getByRole('listbox', { name: 'Size' }).getByRole('option')
    public colorBtn = (productIndex: number) => this.listOfProductItem.nth(productIndex).getByRole('listbox', { name: 'Color' }).getByRole('option')
    public addCartBtn = (productIndex: number) => this.listOfProductItem.nth(productIndex).getByRole('button', { name: 'Add to Cart' })
    public addWishlistBtn = (productIndex: number) => this.listOfProductItem.nth(productIndex).locator('.towishlist')
    public addCompareBtn = (productIndex: number) => this.listOfProductItem.nth(productIndex).locator('.tocompare')

    @step()
    private async addProductToBasket(productIndex: number, sizeIndex?, colorIndex?){
        if (sizeIndex!== undefined){
            await this.sizeBtn(productIndex).nth(sizeIndex).click({ delay:500 })
            await this.colorBtn(productIndex).nth(colorIndex).click()
            await this.addCartBtn(productIndex).click({ delay: 500 })
            await this.alertMessage.waitFor()

        } else {
            let countOfSizeOption = await this.sizeBtn(productIndex).count()
            let countOfColorOption = await this.colorBtn(productIndex).count()

            await this.sizeBtn(productIndex).nth(this.getRandomNth(countOfSizeOption)).click()
            await this.colorBtn(productIndex).nth(this.getRandomNth(countOfColorOption)).click()
            await this.addCartBtn(productIndex).click()
            await this.alertMessage.waitFor()
        }
    }

    @step()
    async addToBasketReturnItsData(productIndex: number, sizeIndex?: number, colorIndex?: number) {
        let inHeader = new HeaderElements(this.page)
        let counter = await inHeader.getBasketCounter();

        // Forced try. The sandbox site contains very tricky bugs that developers haven`t fixed yet.
        let i = 0
        do {
            try {
                await this.addProductToBasket(productIndex, sizeIndex, colorIndex)
                counter++;
                await inHeader.getBasketCounter(counter);
            } catch (error) {
                counter = await inHeader.getBasketCounter()
                i++

                continue;
            }
            break;
        } while (i < 3);

        return {
            name: await this.getProductName('one', productIndex),
            priceString: await this.getProductPrice('one', productIndex),
            priceInt: parseFloat((await this.getProductPrice('one', productIndex)).replace("$", ""))
        }
    }

    public getProductName = async (mode: 'all' | 'one', productIndex?: number) => {
        if (mode === 'one') {
        let productName = await this.productName.nth(productIndex).textContent();
        return productName.replace(/^[^a-zA-Z]*([a-zA-Z].*[a-zA-Z])[^a-zA-Z]*$/, '$1');
        }
        let productName = await this.productName.allInnerTexts();
        return productName
    };

    public getProductPrice = async( mode: 'all' | 'one', productIndex?: number ) => {
        if(mode === 'one'){
            return await this.productPrice.nth(productIndex).textContent()
        }
        return (await this.productPrice.allInnerTexts()).map(str => parseFloat(str.replace('$', '')));
    };

    public getProductReview = async (productIndex: number) => {
        return await this.productReviews.nth(productIndex).textContent();
    };


    async getAriaCheckedLabels (labelName: string) {
        let attributes: any = [];
        for (let i = 0; i < await this.listOfProductItem.count(); i++) {
            attributes.push(await this.listOfProductItem.nth(i).getByLabel(labelName, { exact: true }).getAttribute('aria-checked'))
        }
        return attributes
    };

    public getSuccessAllertMsg = async () => {
        return await this.alertMessage.textContent();
    };

}
