import { test } from "@playwright/test"
import { expect } from "@playwright/test";
import { MainPage } from "../page-objects/MainPage"
import { CheckoutPage } from "../page-objects/CheckoutPage"
import { SignInPage } from "../page-objects/SignInPage"
import { SinghUpPage } from "../page-objects/SinghUpPage"
import { MagentoTestUserData } from "../data/signInData"
import { WrongUserData } from "../data/signInData"
import { shippingAddressData } from "../data/shippingAddressData"

test("LogIn test", async ({ page }) => {
    /*
    Check Sign In
    STR:
    1. Open host URL https://magento.softwaretestingboard.com
    2. Clear coookies
    3. Click “Sign in” button
    4. Log in as a registered user
    5. Check the welcome text
    */
    const mainPage = new MainPage(page)
    const signInPage = new SignInPage(page)

    await mainPage.visitMainePage('/')
    await page.context().clearCookies()
    await page.reload()
    let result = await signInPage.login(MagentoTestUserData)
    expect(result).toContain("Welcome")
})

test("LogIn with wrong data Test", async ({ page }) => {
    /*
    Check Sign In
    STR:
    1. Open host URL https://magento.softwaretestingboard.com
    2. Clear coookies
    3. Click “Sign in” button
    4. Log in as a user with wrong email and pass
    5. Check allert message
    */
    const mainPage = new MainPage(page)
    const signInPage = new SignInPage(page)

    await mainPage.visitMainePage('/')
    await page.context().clearCookies()
    await page.reload()
    let result = await signInPage.loginWrongData(WrongUserData)
    expect(result).toContain("The account sign-in was incorrect")
})

test("LogIn from checkOut page Test", async ({ page }) => {
    const mainPage = new MainPage(page)
    const checkoutPage = new CheckoutPage(page)

    await mainPage.visitMainePage('/')
    await page.context().clearCookies()
    await page.reload()

    await mainPage.visitMainePage('/')
    await mainPage.addToBasket("1", "S", "Blue")
    await checkoutPage.visitCheckoutPage()
    const result = await checkoutPage.login(MagentoTestUserData)
    expect(result).toContain("Pennsylvania Avenue NW")
})
