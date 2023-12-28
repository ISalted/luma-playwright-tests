import { test, expect } from "@playwright/test"
import { PageManager } from "../page-objects/helpers/pageManager";

import { shippingAddressData } from "../data/shippingAddressData"

test.beforeEach(async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onMainPage().visitMainePage()
    await pm.onSignUpPage().clearCookies()
})

test("Clear basket from Shopping Cart test", async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onMainPage().addToBasket("1", "S", "Blue")
    await pm.onMainPage().addToBasket("2", "M", "White")
    await pm.onMainPage().addToBasket("4", "L", "Black")
    await pm.onShoppingCartPage().removeItemsFromShoppingCart()
})

test("Clear basket from header test", async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onMainPage().addToBasket("1","S","Blue")
    await pm.onMainPage().addToBasket("2", "M", "White")
    await pm.onMainPage().addToBasket("4", "L", "Black")
    await pm.onMainPage().onHeader.clearBasketFromHeader()
})

test("Remove cheapest item test", async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onMainPage().addToBasket("1", "S", "Blue")
    await pm.onMainPage().addToBasket("2", "M", "White")
    await pm.onMainPage().addToBasket("4", "L", "Black")
    await pm.onShoppingCartPage().removeCheapestItem()
})

test("Place order test", async ({page})=>{
    const pm = new PageManager(page)
    // await page.pause()
    await pm.onMainPage().onHeader.createAnAccountButtonClick()
    await pm.onSignUpPage().createNewCustomer(pm.onSignUpPage().getUniqueEmailPass('email'), pm.onSignUpPage().getUniqueEmailPass('pass'))
    await pm.onSignUpPage().onHeader.logoButtonClick()

    await pm.onMainPage().addToBasket("2", "M", "White");
    await pm.onMainPage().addToBasket("4", "L", "Black");
    await pm.onCheckoutPage().visitCheckoutPage()
    await pm.onCheckoutPage().fillShippingDetails(shippingAddressData)
    const result = await pm.onCheckoutPage().placeOrder()
    expect(result).toBe('Thank you for your purchase!')
})
