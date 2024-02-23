import { BasePage } from "../helpers/basePage";
import { step } from "../helpers/step";
import { HeaderElements } from "./header.component"

export class ProductGrid extends BasePage {

    public alertMessage = this.page.getByRole('alert').filter({ hasText: 'You added ' })

    public productName: any = (productIndex: number) => {
        return this.page
            .locator('.product-items')
            .locator('li')
            .nth(productIndex)
            .locator('.product-item-name')
    }

    public productReviews: any = (productIndex: number) => {
        return this.page
            .locator('.product-items')
            .locator('li')
            .nth(productIndex)
            .locator('.action.view')
    }

    public productPrice: any = (productIndex: number) => {
        return this.page
            .locator('.product-items')
            .locator('li')
            .nth(productIndex)
            .locator('.price')
    }

    public sizeBtn = (productIndex:number) => {
        return this.page
                .locator('.product-items')
                .locator('li').nth(productIndex)
                .getByRole('listbox', { name: 'Size' })
                .getByRole('option')
    };

    public colorBtn = (productIndex: number) => {
        return this.page
                .locator('.product-items')
                .locator('li')
                .nth(productIndex)
                .getByRole('listbox', { name: 'Color' })
                .getByRole('option')
    }

    public addCartBtn = (productIndex: number) => {
        return this.page
                .locator('.product-items')
                .locator('li')
                .nth(productIndex)
                .getByRole('button', { name: 'Add to Cart' })
    }

    public addWishlistBtn = (productIndex: number) => {
        return this.page
            .locator('.product-items')
            .locator('li')
            .nth(productIndex)
            .locator('.towishlist')
    }

    public addCompareBtn = (productIndex: number) => {
        return this.page
            .locator('.product-items')
            .locator('li')
            .nth(productIndex)
            .locator('.tocompare')
    }

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

    public getProductName = async (inputLiNumb: number) => {
        let productName = await this.productName(inputLiNumb).textContent();
        return productName.replace(/^[^a-zA-Z]*([a-zA-Z].*[a-zA-Z])[^a-zA-Z]*$/, '$1');
    };

    public getProductPrice = async (inputLiNumb: number) => {
        return await this.productPrice(inputLiNumb).textContent()
    };

    public getProductReview = async (inputLiNumb: number) => {
        return await this.productReviews(inputLiNumb).textContent();
    };

    public getSuccessAllertMsg = async () => {
        return await this.alertMessage.textContent();
    };



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
                console.log("Catch" + counter);

                i++
                console.log("IIII = " + i);
                continue;
            }
            break;
        } while (i < 3);

        return {
            name: await this.getProductName(productIndex),
            priceString: await this.getProductPrice(productIndex),
            priceInt: parseFloat((await this.getProductPrice(productIndex)).replace("$", ""))
        }
    }


    @step()
    private getBasketPrices (inputLiNumb: number) {

        return this.productPrice(inputLiNumb).textContent()
    }
}
