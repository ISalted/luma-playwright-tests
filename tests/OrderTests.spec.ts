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

    await pm.onMainPage().addToBasketFromMainPage("0", "S", "Blue")
    await pm.onMainPage().addToBasketFromMainPage("1", "M", "White")
    await pm.onMainPage().addToBasketFromMainPage("3", "L", "Black")
    await pm.onMainPage().inHeader.goToShoppingCartPageFromHeader()

    let countOfItemsInABasket = await pm.onShoppingCartPage().removeAllItemsFromShoppingCart()
    expect(countOfItemsInABasket).toBe(0)
})

test("Clear basket from header test", async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onMainPage().addToBasketFromMainPage("0","S","Blue")
    await pm.onMainPage().addToBasketFromMainPage("1", "M", "White")
    await pm.onMainPage().addToBasketFromMainPage("3", "L", "Black")
    let countOfItemsInABasket = await pm.onMainPage().inHeader.clearBasketFromHeader()
    expect(countOfItemsInABasket).toBe(0)

})

test("Remove cheapest item test", async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onMainPage().addToBasketFromMainPage("0", "S", "Blue")
    await pm.onMainPage().addToBasketFromMainPage("1", "M", "White")
    await pm.onMainPage().addToBasketFromMainPage("3", "L", "Black")
    await pm.onMainPage().inHeader.goToShoppingCartPageFromHeader()

    let cheapestItemInTheBasketAfterRemoval = await pm.onShoppingCartPage().removeCheapestItem()
    expect(cheapestItemInTheBasketAfterRemoval).toBe(34)

})

test.only("Place order test", async ({page})=>{
    const pm = new PageManager(page)
    await pm.onMainPage().inHeader.createAnAccountButtonClick()
    await pm.onSignUpPage().signUpAsANewCustomer(pm.onSignUpPage().getUniqueEmailOrPass('email'), pm.onSignUpPage().getUniqueEmailOrPass('pass'))
    await pm.onSignUpPage().inHeader.logoButtonClick()

    await pm.onMainPage().addToBasketFromMainPage("1", "M", "White");
    await pm.onMainPage().addToBasketFromMainPage("3", "L", "Black");
    await pm.onCheckoutPage().inHeader.goToCheckoutPageFromHeader()
    await pm.onCheckoutPage().fillShippingDetails(shippingAddressData)
    const result = await pm.onCheckoutPage().placeOrder()
    expect(result).toContain('Thank you for your purchase!')
})
