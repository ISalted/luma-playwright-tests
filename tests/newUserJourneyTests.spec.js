import {test} from "@playwright/test"
import { expect } from "@playwright/test";
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
    await signInPage.login(ChumakDanylo)
    // await mainPage.addToBasket("1","S","Blue")
    // await mainPage.addToBasket("2", "M", "White")
    // await mainPage.addToBasket("4", "L", "Black")
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

test.skip("Check Out", async ({ page }) => {
    const headerPage = new HeaderPage(page)
    const signInPage = new SignInPage(page)
    const mainPage = new MainPage(page)
    const shoppingCartPage = new ShoppingCartPage(page)
    const menJacketsPage = new MenJacketsPage(page)
    const checkoutPage = new CheckoutPage(page)
    const sighUpPage = new SinghUpPage(page)

    await sighUpPage.visitSignUpPage()
    await sighUpPage.createNewCustomer(sighUpPage.getUniqueEmailPass('email'), sighUpPage.getUniqueEmailPass('pass'))
    let logiCookie = await page.request.storageState()
    await mainPage.visitMainePage()
    await mainPage.addToBasket("2", "M", "White");
    await mainPage.addToBasket("4", "L", "Black");
    await page.context().clearCookies()
    await page.reload()
    await page.context().addCookies(logiCookie.cookies)
    await page.reload()


})

test.skip("API test", async ({ request }) => {

    await request.post("https://petstore.swagger.io/v2/pet", {
        data: {
            "id": 33,
            "category": {
                "id": 1,
                "name": "string"
            },
            "name": "apiTestPetTiko",
            "photoUrls": [
                "string"
            ],
            "tags": [
                {
                    "id": 0,
                    "name": "string"
                }
            ],
            "status": "available"
        }
    })

    let responce = await request.get('https://petstore.swagger.io/v2/pet/33');
    console.log(await responce.json())
})


