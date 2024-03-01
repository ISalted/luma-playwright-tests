import { step } from "../helpers/step";
import { Components } from "../page-components/components";

interface Product {
    itemInCart: string;
    cartSubtotalCur: string;
    cartSubtotalInt: number;
    basketItems: {
        name: string;
        size: string;
        color: string;
        priceCur: string;
        priceInt: number;
        quantity: string;
    }[];
}

export class ShoppingCartPage extends Components {
    public pagePath = '/checkout/cart'

    public itemName = this.page.locator('#shopping-cart-table').getByRole('strong')
    private basketCards = this.page.locator('.cart.item')

    @step()
    async visitPageByUrl () {
        await this.page.goto("/checkout/cart")
    }

    @step()
    async removeProduct(productName) {
        await this.itemName.filter({ hasText: productName }).waitFor()
        await this.itemName.filter({ hasText: productName }).locator('../../../..').locator('.action.action-delete').click()
        await this.itemName.filter({ hasText: productName }).waitFor({state: 'hidden'})
    }

    @step()
    async removeAll(product: Product) {
        for (const item of product.basketItems) {
            await this.removeProduct(item.name);
        }
    }

    @step()
    async removeCheapestItem(basketProductData: Product) {
        await this.basketCards.first().waitFor()
        await this.removeProduct(basketProductData.basketItems[0].name)
    }

    @step()
    async visibleStatus(productName) {
        return await this.itemName.filter({ hasText: productName }).isVisible()
    }

}
