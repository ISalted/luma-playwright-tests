import { log } from "console";
import { BasePage, Locator } from "../helpers/basePage";
import { step } from "../helpers/step";
import { HeaderElements } from "./header.component"

interface Product {
    name: string;
    priceCurr: string | null;
    priceInt: number | null;
    reviews: string | null;
    size: string[];
    color: string[];
}

export class ProductGrid extends BasePage {

    private root: Locator = this.page.locator('#maincontent')

    public alertMessage: Locator = this.page.getByRole('alert').filter({ hasText: 'You added ' })
    private productList: Locator = this.root.locator('.product-items li')
    private productPrice:any = this.productList.locator('.price')
    private productName: any = this.productList.locator('.product-item-name')

    @step()
    async getProductData(sortBy?: 'name' | 'price'): Promise<Product[]> {
        const allProductList = await this.productList.all();

        const productPromises = allProductList.map(async (productIndex) => {
            const namePromise = productIndex.locator('.product-item-link').innerText();
            const priceCurPromise = productIndex.locator('.price').textContent() || '';
            const priceInt = this.stringToNumb(await priceCurPromise);

            const reviewsElement = await productIndex.locator('.action.view');
            const reviewsPromise = (await reviewsElement.isVisible()) ? reviewsElement.textContent() : '';

            const sizeElement = productIndex.getByRole('listbox', { name: 'Size' }).locator('.swatch-option.text');
            const sizeOptions = await sizeElement.all();
            const sizePromises = sizeOptions.map(async (option) => (await option.getAttribute('option-label')) || '');

            const colorElements = productIndex.getByRole('listbox', { name: 'Color' }).locator('.swatch-option');
            const colorOptions = await colorElements.all();
            const colorPromises = colorOptions.map(async (option) => (await option.getAttribute('option-label')) || '');

            const [name, priceCur, reviews, size, color] = await Promise.all([namePromise, priceCurPromise, reviewsPromise, Promise.all(sizePromises), Promise.all(colorPromises)]);

            return { name, priceCurr: priceCur, priceInt, reviews, size, color };
        });

        const productResults = await Promise.all(productPromises);

        productResults.sort((a, b) => sortBy === 'price' ? a.priceInt - b.priceInt : (sortBy === 'name' ? a.name.localeCompare(b.name) : 0));

        return productResults;
    }

    private addProduct = async (productDetails: Product, sizeIndex?: number, colorIndex?: number) => {
        sizeIndex = typeof sizeIndex === 'undefined' ? this.getRandomNth(productDetails.size.length) : sizeIndex;
        colorIndex = typeof colorIndex === 'undefined' ? this.getRandomNth(productDetails.color.length) : colorIndex;

        await this.productList.filter({ hasText: productDetails.name })
            .getByRole('listbox', { name: 'Size' })
            .getByRole('option', { name: productDetails.size[sizeIndex], exact: true }).click();

        await this.productList.filter({ hasText: productDetails.name })
            .getByRole('listbox', { name: 'Color' })
            .getByRole('option', { name: productDetails.color[colorIndex], exact: true }).click();

        await this.productList.filter({ hasText: productDetails.name })
            .getByRole('button', { name: 'Add to Cart' }).click();

        await this.alertMessage.waitFor();
    };


    @step()
    async addToCart(productDetails: Product, sizeIndex?: number, colorIndex?: number) {
        // Forced try. The sandbox site contains very tricky bugs that developers haven`t fixed yet.
        let inHeader = new HeaderElements(this.page)
        let counter = await inHeader.getBasketCounter();
        let i = 0
        do {
            try {
                await this.addProduct(productDetails, sizeIndex, colorIndex)
                counter++;
                await inHeader.getBasketCounter(counter);
            } catch (error) {
                counter = await inHeader.getBasketCounter()
                i++

                continue;
            }
            break;
        } while (i < 3);
    }

    @step()
    async getProductName (mode: 'all' | 'one', productIndex?: number) {
        if (mode === 'one') {
        let productName = await this.productName.nth(productIndex).textContent();
        return productName.replace(/^[^a-zA-Z]*([a-zA-Z].*[a-zA-Z])[^a-zA-Z]*$/, '$1');
        }
        let productName = await this.productName.allInnerTexts();
        return productName
    };

    @step()
    async getProductPrice ( mode: 'all' | 'one', productIndex?: number ) {
        if(mode === 'one'){
            return await this.productPrice.nth(productIndex).textContent()
        }
        return (await this.productPrice.allInnerTexts()).map(str => parseFloat(str.replace('$', '')));
    };

    @step()
    async getAriaCheckedLabels (labelName: string) {
        let attributes: any = [];
        for (let i = 0; i < await this.productList.count(); i++) {
            attributes.push(await this.productList.nth(i).getByLabel(labelName, { exact: true }).getAttribute('aria-checked'))
        }
        return attributes
    };

    @step()
    async getSuccessAllertMsg () {
        return await this.alertMessage.textContent();
    };

}
