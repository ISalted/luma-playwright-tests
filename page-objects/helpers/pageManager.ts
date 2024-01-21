import { Page } from "@playwright/test"
import { MainPage } from "../mainPage"
import { SignInPage } from "../signInPage"
import { SinghUpPage } from "../signUpPage"
import { CheckoutPage } from "../checkoutPage"
import { MenJacketsPage } from "../menJacketsPage"
import { ShoppingCartPage } from "../shoppingCartPage"
import { MyAccountPage } from "../myAccountPage"
export class PageManager {

    private readonly page: Page
    // private readonly headerPage : HeaderPage
    private readonly mainPage: MainPage
    private readonly signInPage: SignInPage
    private readonly singhUpPage: SinghUpPage
    private readonly checkoutPage: CheckoutPage
    private readonly menJacketsPage: MenJacketsPage
    private readonly shoppingCartPage: ShoppingCartPage
    private readonly myAccountPage: MyAccountPage

    constructor(page: Page) {
        this.page = page

        this.mainPage = new MainPage(this.page)
        this.signInPage = new SignInPage(this.page)
        this.singhUpPage = new SinghUpPage(this.page)
        this.myAccountPage = new MyAccountPage(this.page)
        this.checkoutPage = new CheckoutPage(this.page)
        this.menJacketsPage = new MenJacketsPage(this.page)
        this.shoppingCartPage = new ShoppingCartPage(this.page)
    }

    // onHeaderPage() {
    //     return this.headerPage
    // }

    onMainPage() {
        return this.mainPage
    }
    onSignInPage() {
        return this.signInPage
    }
    onSignUpPage() {
        return this.singhUpPage
    }
    onMyAccountPage() {
        return this.myAccountPage
    }
    onCheckoutPage() {
        return this.checkoutPage
    }
    onMenJacketsPage() {
        return this.menJacketsPage
    }
    onShoppingCartPage() {
        return this.shoppingCartPage
    }


}
