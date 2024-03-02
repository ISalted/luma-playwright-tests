import { step } from "../helpers/step"
import { BasePage } from "../helpers/basePage"

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

export class HeaderElements extends BasePage {

    private root = this.page.getByRole('banner')

    private productList = this.root.locator('.minicart-items li')

    public writeForUsBtn = this.root.locator('.not-logged-in', { hasText: "Write for us" })
    public welcomeBtn = this.root.locator('.logged-in', { hasText: "Welcome, " })
    private signInBtn = this.root.getByRole('link', { name: 'Sign In' })
    private signOutBtn = this.root.getByRole('link', { name: 'Sign Out' })
    private createAnAccountBtn = this.root.getByRole('link', { name: 'Create an Account' })
    private changeDropDownBtn = this.root.locator('.customer-name').getByRole('button', { name: 'Change' })

    private logoBtn = this.root.getByLabel('store logo')

    private searchFld = this.root.getByRole('combobox', { name: 'Search' })
    private searchBtn = this.root.getByRole('button', { name: 'Search' })
    private searchAutoComplete = (option) => this.root.locator('#search_autocomplete').getByRole('option', { name: option })

    private basketCounter: any = this.root.locator('.counter-number')
    private basketCards: any = this.root.locator('#mini-cart')
    private basketCartSubtotal: any = this.root.locator('.subtotal').locator('.price-wrapper')

    private showBasketBtn = this.root.locator('.action.showcart')
    private hideBasketBtn = this.root.locator('.action.showcart.active')

    public proceedToCheckoutBtn = this.root.getByRole('button', { name: 'Proceed to Checkout' })
    public viewAndEditCartBtn = this.root.getByRole('link', { name: 'View and Edit Cart' })

    public acceptDeleteProductBtn = this.page.getByRole('button', { name: 'OK' })

    public basketProductName = this.basketCards.locator('.product-item-name')
    private deleteProductBtn: any = (inputProductName?: string) =>  this.basketCards.locator('li', { hasText: inputProductName }).locator('.action.delete')


    @step()
    async getProductData(sortBy?:'name' | 'price'): Promise<Product> {
        await this.openBasket();

        const itemInCart = await this.page.locator('.items-total .count').textContent() || '';
        const cartSubtotalCur = await this.basketCartSubtotal.textContent() || '';
        const cartSubtotalInt = this.stringToNumb(cartSubtotalCur)


        const allProductList = await this.productList.all();
        let basketItems: Product['basketItems'] = [];

        for (const productIndex of allProductList) {
            const name = (await productIndex.locator('.product-item-name').innerText()) || '';
            await productIndex.getByRole('tab', { name: 'See Details' }).click();
            const size = (await productIndex.locator('.values').nth(0).innerText()) || '';
            const color = (await productIndex.locator('.values').nth(1).innerText()) || '';
            const priceCur = (await productIndex.locator('.price').innerText()) || '';
            const priceInt = this.stringToNumb(priceCur)
            const quantity = (await productIndex.getByRole('spinbutton').getAttribute('data-item-qty')) || '';

            basketItems.push({ name, size, color, priceCur, priceInt, quantity });
        }
        
        basketItems.sort((a, b) => sortBy === 'price' ? a.priceInt - b.priceInt : (sortBy === 'name' ? a.name.localeCompare(b.name) : 0));

        return { itemInCart, cartSubtotalCur, cartSubtotalInt, basketItems };
    }

    @step()
    async clickLogoBtn () {
        await this.logoBtn.click()
        await this.page.waitForLoadState('networkidle')

    }

    @step()
    async clickSignInBtn () {
        await this.signInBtn.click()
    }

    @step()
    async clickCreateAccountBtn () {
        await this.createAnAccountBtn.click()
        await this.writeForUsBtn.waitFor()
    }

    @step()
    async signOut() {
        if (await this.signOutBtn.isHidden({timeout:500})){
            await this.changeDropDownBtn.click()
        }
        await this.signOutBtn.click()
    }

    @step()
    async openBasket() {
        await this.basketCounter.waitFor()
        if (await this.proceedToCheckoutBtn.isHidden({timeout:1000}))
            await this.showBasketBtn.click()
    }

    @step()
    async getWelcomeMsg () {
        return await this.welcomeBtn.textContent()
    }

    @step()
    async searchEntireStore(searchValue: string, option: 'all' | 'autocomplete') {
        await this.searchFld.fill(searchValue)
        let randomAutoCompleteIndex = this.getRandomNth(await this.searchAutoComplete(searchValue).count())
        if (option === 'all') {
            await this.searchBtn.click()
        } else {
            await this.searchAutoComplete(searchValue).nth(randomAutoCompleteIndex).click()
        }
    }

    @step()
    async getBasketCounter(actualCounterNumber?: number) {
        let counter = await this.basketCounter.filter({ hasText: actualCounterNumber }).textContent({ timeout: 5000 })
        if (counter === '') counter = 0
        return parseInt(counter, 10)
    }

    @step()
    async navigateToCheckoutPage () {
        await this.openBasket()
        await this.proceedToCheckoutBtn.waitFor()
        await this.proceedToCheckoutBtn.click({delay: 500})
    }

    @step()
    async navigateToShoppingCartPage (){
        await this.openBasket()
        await this.viewAndEditCartBtn.click({ delay: 500 })
    }

    @step()
    async removeProductFromBasket (productName: string) {
        await this.openBasket()
        await this.basketProductName.filter({ hasText: productName }).locator('..').getByRole('link', { name: 'Remove' }).click()
        await this.acceptDeleteProductBtn.click()
        await this.basketProductName.filter({ hasText: productName }).waitFor({ state: 'hidden' })
    }

    @step()
    async removeAllFromBasket(product: Product) {
        for (const item of product.basketItems) {
            await this.removeProductFromBasket(item.name);
        }
    }

    public calculateCartSubtotal = (basketData: { basketItems: { priceInt: number }[] }): number =>
        basketData.basketItems.reduce((total, item) => total + item.priceInt, 0);
}
