import { test } from "@playwright/test"
import { expect } from "@playwright/test";
import { MainPage } from "../page-objects/MainPage"
import { SinghUpPage } from "../page-objects/SinghUpPage"
import { CheckoutPage } from "../page-objects/CheckoutPage"
import { shippingAddressData } from "../data/shippingAddressData"

test("Place order test", async ({ page }) => {
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
