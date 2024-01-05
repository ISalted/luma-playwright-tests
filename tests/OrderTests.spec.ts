import { test, expect } from "@playwright/test"
import { PageManager } from "../page-objects/helpers/pageManager";

import { shippingAddressData } from "../data/shippingAddressData"

test.beforeEach(async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onMainPage().visitMainPage()
    await pm.onSignUpPage().clearCookies()
})

test("Clear basket from Shopping Cart test", async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onMainPage().addToBasketFromMainPage("1", "S", "Blue")
    await pm.onMainPage().addToBasketFromMainPage("2", "M", "White")
    await pm.onMainPage().addToBasketFromMainPage("4", "L", "Black")
    await pm.onShoppingCartPage().removeItemsFromShoppingCart()
})

test("Clear basket from header test", async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onMainPage().addToBasketFromMainPage("1","S","Blue")
    await pm.onMainPage().addToBasketFromMainPage("2", "M", "White")
    await pm.onMainPage().addToBasketFromMainPage("4", "L", "Black")
    await pm.onMainPage().inHeader.clearBasketFromHeader()
})

test("Remove cheapest item test", async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onMainPage().addToBasketFromMainPage("1", "S", "Blue")
    await pm.onMainPage().addToBasketFromMainPage("2", "M", "White")
    await pm.onMainPage().addToBasketFromMainPage("4", "L", "Black")
    await pm.onShoppingCartPage().removeCheapestItem()
})

test("Place order test", async ({page})=>{
    const pm = new PageManager(page)
    console.log(pm.onMainPage().inUiMenu.getItemFromLevel0.Gear)
    await pm.onMainPage().inHeader.createAnAccountButtonClick()
    await pm.onSignUpPage().createNewCustomer(pm.onSignUpPage().getUniqueEmailPass('email'), pm.onSignUpPage().getUniqueEmailPass('pass'))
    await pm.onSignUpPage().inHeader.logoButtonClick()

    await pm.onMainPage().addToBasketFromMainPage("2", "M", "White");
    await pm.onMainPage().addToBasketFromMainPage("4", "L", "Black");
    await pm.onCheckoutPage().visitCheckoutPage()
    await pm.onCheckoutPage().fillShippingDetails(shippingAddressData)
    const result = await pm.onCheckoutPage().placeOrder()
    expect(result).toBe('Thank you for your purchase!')
})
