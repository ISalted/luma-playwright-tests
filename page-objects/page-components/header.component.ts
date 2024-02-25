import { step } from "../helpers/step"
import { BasePage } from "../helpers/basePage"

export class HeaderElements extends BasePage {

    public writeForUsBtn = this.page.getByRole('banner').locator('.not-logged-in', { hasText: "Write for us" })
    public welcomeBtn = this.page.getByRole('banner').locator('.logged-in', { hasText: "Welcome, " })
    private signInBtn = this.page.getByRole('link', { name: 'Sign In' })
    private signOutBtn = this.page.getByRole('link', { name: 'Sign Out' })
    private createAnAccountBtn = this.page.getByRole('link', { name: 'Create an Account' })
    private changeDropDownBtn = this.page.locator('.customer-name').getByRole('button', { name: 'Change' })

    private logoBtn = this.page.getByLabel('store logo')

    private searchFld = this.page.getByPlaceholder('Search entire store here...')
    private searchBtn = this.page.getByRole('button', { name: 'Search' })

    private basketCounter: any = this.page.locator('.counter-number')
    private basketCards: any = this.page.locator('#mini-cart')
    private basketCartSubtotal: any = this.page.locator('.subtotal').locator('.price-wrapper')

    private showBasketBtn = this.page.locator('.action.showcart')
    private hideBasketBtn = this.page.locator('.action.showcart.active')

    public proceedToCheckoutBtn = this.page.getByRole('button', { name: 'Proceed to Checkout' })
    public viewAndEditCartBtn = this.page.getByRole('link', { name: 'View and Edit Cart' })

    public acceptDeleteProductBtn = this.page.getByRole('button', { name: 'OK' })

    private basketProductName: any = (index) =>  this.basketCards.locator('.product-item-name').nth(index)
    private basketProductPrice: any = (index) => this.basketCards.locator('.price').nth(index)
    private basketProductQuantity: any = (index) => this.basketCards.getByRole('spinbutton').nth(index)
    private deleteProductBtn: any = (inputProductName?: string) =>  this.basketCards.locator('li', { hasText: inputProductName }).locator('.action.delete')

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
        await this.writeForUsBtn.waitFor({state: 'visible'})
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
        await this.basketCounter.waitFor({ state: 'visible' })
        if (await this.proceedToCheckoutBtn.isHidden({timeout:500}))
            await this.showBasketBtn.click()
    }

    @step()
    async getWelcomeMsg () {
        return await this.welcomeBtn.textContent()
    }

    @step()
    async searchEntireStore (searchData: string) {
        await this.searchFld.fill(searchData)
        await this.searchBtn.click()
    }

    @step()
    async getBasketProductName(index) {
        await this.openBasket()
        return (await this.basketProductName(index).textContent()).replace(/^[^a-zA-Z]*([a-zA-Z].*[a-zA-Z])[^a-zA-Z]*$/, '$1')
    }

    @step()
    async getBasketProductPrice(index) {
        await this.openBasket()
        return await this.basketProductPrice(index).textContent()
    }

    @step()
    async getBasketProductQuantity(index) {
        await this.openBasket()
        return await this.basketProductQuantity(index).getAttribute('data-item-qty')
    }

    @step()
    async getBasketCounter(actualCounterNumber?: number) {
        let counter = await this.basketCounter.filter({ hasText: actualCounterNumber }).textContent({ timeout: 5000 })
        if (counter === '') counter = 0
        return parseInt(counter, 10)
    }

    @step()
    async getCartSubtotalFromBasket() {
        return parseFloat((await this.basketCartSubtotal.textContent()).replace("$", ""))
    }

    @step()
    async getBasketData() {
        await this.openBasket()

        let itemInCart = await this.page.locator('.items-total .count').textContent()
        let cartSubtotal = await this.getCartSubtotalFromBasket()

        const productsData: {
            name: any;
            price: any;
            quantity: any;
        }[] = [];

        let i = 0
        let productsCount = await this.page.locator('#mini-cart li').locator('.product-item-name').count()

        do {
            const product = {
            name: await this.getBasketProductName(i),
            price: await this.getBasketProductPrice(i),
            quantity: await this.getBasketProductQuantity(i)
            }
            productsData.push(product);
            i++
        } while (i < productsCount);

        return {
            itemInCart: itemInCart,
            cartSubtotal: cartSubtotal,
            ItemsData: productsData
        }
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
    async deleteProductFromTheBasket (inputProductName?: string) {
        await this.showBasketBtn.click()
        await this.deleteProductBtn(inputProductName).click()
        await this.acceptDeleteProductBtn.click()
        await this.basketProductName(inputProductName).waitFor({ state: 'hidden' })
        return await this.basketProductName(inputProductName).isVisible()
    }

    @step()
    async clearBasket () {
        let countOfProducts = await this.basketCards.locator('li').count()
        await this.showBasketBtn.click()
        await this.basketCards.first().waitFor({ state: 'visible' })

        while (countOfProducts !== 0) {
            await this.deleteProductBtn().first().click()
            await this.acceptDeleteProductBtn.click()
            countOfProducts--
            await this.page.waitForFunction(
                (expectedCount) => {
                    const liElements = Array.from(document.querySelectorAll('[id="mini-cart"] li'));
                    return liElements.length === expectedCount;
                }, countOfProducts
            )
        }
        countOfProducts = await this.basketCards.count()
        return countOfProducts
    }
}
