import { Page } from "@playwright/test"
import { MainPage } from "../page/main.page"
import { SignInPage } from "../page/signIn.page"
import { SinghUpPage } from "../page/signUp.page"
import { CheckoutPage } from "../page/checkout.page"
import { MenJacketsPage } from "../page/menJackets.page"
import { ShoppingCartPage } from "../page/shoppingCart.page"
import { MyAccountPage } from "../page/myAccount.page"

export class PageManager {
    constructor(protected page: Page) { }

    public onMainPage = new MainPage(this.page)
    public onSignInPage = new SignInPage(this.page)
    public onSignUpPage = new SinghUpPage(this.page)
    public onMyAccountPage = new MyAccountPage(this.page)
    public onCheckoutPage = new CheckoutPage(this.page)
    public onMenJacketsPage = new MenJacketsPage(this.page)
    public onShoppingCartPage = new ShoppingCartPage(this.page)

}
