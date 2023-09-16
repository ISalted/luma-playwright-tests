import { test } from "@playwright/test"
import { expect } from "@playwright/test";
import { HeaderPage } from "../page-objects/HeaderPage"
import { MainPage } from "../page-objects/MainPage"
import { ShoppingCartPage } from "../page-objects/ShoppingCartPage"
import { SinghUpPage } from "../page-objects/SinghUpPage"
import { CheckoutPage } from "../page-objects/CheckoutPage"
import { MagentoTestUserData } from "../data/signInData"
import { shippingAddressData } from "../data/shippingAddressData"

test("Clear basket from Shopping Cart test", async ({ page }) => {
    const mainPage = new MainPage(page)
    const shoppingCartPage = new ShoppingCartPage(page)

    await mainPage.visitMainePage('/')
    await mainPage.addToBasket("1", "S", "Blue")
    await mainPage.addToBasket("2", "M", "White")
    await mainPage.addToBasket("4", "L", "Black")
    await shoppingCartPage.removeItemsFromShoppingCart()
})

test("Clear basket from header test", async ({ page }) => {
    const headerPage = new HeaderPage(page)
    const mainPage = new MainPage(page)

    await mainPage.visitMainePage('/')
    await mainPage.addToBasket("1","S","Blue")
    await mainPage.addToBasket("2", "M", "White")
    await mainPage.addToBasket("4", "L", "Black")
    await headerPage.clearBasketFromHeader()
})

test("Remove cheapest item test", async ({ page }) => {
    const mainPage = new MainPage(page)
    const shoppingCartPage = new ShoppingCartPage(page)

    await mainPage.visitMainePage('/')
    await mainPage.addToBasket("1", "S", "Blue")
    await mainPage.addToBasket("2", "M", "White")
    await mainPage.addToBasket("4", "L", "Black")
    await shoppingCartPage.removeCheapestItem()
})

test ("Place order test", async ({page})=>{
    const checkoutPage = new CheckoutPage(page)
    const mainPage = new MainPage(page)
    const sighUpPage = new SinghUpPage(page)

    await sighUpPage.visitSignUpPage()
    await page.context().clearCookies()
    await page.reload()

    await sighUpPage.createNewCustomer(sighUpPage.getUniqueEmailPass('email'), sighUpPage.getUniqueEmailPass('pass'))
    await mainPage.visitMainePage()

    await mainPage.addToBasket("2", "M", "White");
    await mainPage.addToBasket("4", "L", "Black");
    await checkoutPage.visitCheckoutPage()
    await checkoutPage.fillShippingDetails(shippingAddressData)
    const result = await checkoutPage.placeOrder()
    expect(result).toBe('Thank you for your purchase!')
})
