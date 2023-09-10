import {test} from "@playwright/test"
import { HeaderPage } from "../page-objects/HeaderPage"
import { MainPage } from "../page-objects/MainPage"
import { ShoppingCartPage } from "../page-objects/ShoppingCartPage"
import { MenJacketsPage } from "../page-objects/MenJacketsPage"
import { CheckoutPage } from "../page-objects/CheckoutPage"
import { SignInPage } from "../page-objects/SignInPage"
import { SinghUpPage } from "../page-objects/SinghUpPage"
import { v4 as uuidv4 } from "uuid";
import { signInData as ChumakDanylo } from "../data/signInData"
import { shippingAddressData } from "../data/shippingAddressData"

test.skip("New user journey", async ({page}) => {
    const headerPage = new HeaderPage(page)
    const signInPage = new SignInPage(page)
    const mainPage = new MainPage(page)
    const shoppingCartPage = new ShoppingCartPage(page)
    const menJacketsPage = new MenJacketsPage(page)
    const checkoutPage = new CheckoutPage(page)
    const sighUpPage = new SinghUpPage(page)

    await mainPage.visitMainePage('/')
    // await signInPage.login(ChumakDanylo)
    // await mainPage.addToBasket("1","S","Blue")
    await mainPage.addToBasket("2", "M", "White")
    await mainPage.addToBasket("4", "L", "Black")
    // await headerPage.clearBasketFromHeader()
    // await page.pause()
    // await shoppingCartPage.removeItemsFromShoppingCart()
    // await shoppingCartPage.removeCheapestItem()
    // await menJacketsPage.sortByCheapest()
    // await checkoutPage.visitCheckoutPage()
    // await page.pause()
    // await checkoutPage.login(ChumakDanylo)
    await sighUpPage.visitSignUpPage()
    await sighUpPage.createNewCustomer(sighUpPage.getUniqueEmailPass('email'), sighUpPage.getUniqueEmailPass('pass'))
    await checkoutPage.visitCheckoutPage()
})

test("Check Out", async ({ page }) => {
    const headerPage = new HeaderPage(page)
    const signInPage = new SignInPage(page)
    const mainPage = new MainPage(page)
    const shoppingCartPage = new ShoppingCartPage(page)
    const menJacketsPage = new MenJacketsPage(page)
    const checkoutPage = new CheckoutPage(page)
    const sighUpPage = new SinghUpPage(page)

    await sighUpPage.visitSignUpPage()
    await sighUpPage.createNewCustomer(sighUpPage.getUniqueEmailPass('email'), sighUpPage.getUniqueEmailPass('pass'))
    await mainPage.visitMainePage()
    await mainPage.addToBasket("2", "M", "White");
    await mainPage.addToBasket("4", "L", "Black");
    await checkoutPage.visitCheckoutPage()
    // await checkoutPage.login(ChumakDanylo)
    await checkoutPage.fillShippingDetails(shippingAddressData)
    await checkoutPage.placeOrder()
})


