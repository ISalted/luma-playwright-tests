import { MainPage } from "../pages/main.page"
import { SignInPage } from "../pages/signIn.page"
import { SinghUpPage } from "../pages/signUp.page"
import { CheckoutPage } from "../pages/checkout.page"
import { ProductListing } from "../pages/productListing.page"
import { ShoppingCartPage } from "../pages/shoppingCart.page"
import { MyAccountPage } from "../pages/myAccount.page"
import { BasePage } from "./basePage"

export class PageManager extends BasePage{

    public onMainPage = new MainPage(this.page)
    public onSignInPage = new SignInPage(this.page)
    public onSignUpPage = new SinghUpPage(this.page)
    public onMyAccountPage = new MyAccountPage(this.page)
    public onCheckoutPage = new CheckoutPage(this.page)
    public onProductListingPage = new ProductListing(this.page)
    public onShoppingCartPage = new ShoppingCartPage(this.page)

}
