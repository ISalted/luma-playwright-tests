import { test, expect } from "../fixtures/baseFixtures"
import { UserDataWithUniqueEmailAndPass, shippingAddressData } from "../data/userData"

test.describe('Order tests', () => {

test("AddToCart button works on main @order", async ({ pm }) => {

    let productNameFromTheGrid = await pm.onMainPage.addProductToTheBasketFromMainPage("3", "L", "Black")
    let productItemNameFromBasket = await pm.onMainPage.inHeader.getProductItemNameFromBasket(productNameFromTheGrid)
    expect(productNameFromTheGrid).toContain(productItemNameFromBasket)

})

test.only("Remove button in the shopping cart @order", async ({ pm }) => {
    let productNameFromTheGrid = await pm.onMainPage.addProductToTheBasketFromMainPage("3", "L", "Black")
    let presenceOfDeletedItemInTheBasket = await pm.onMainPage.inHeader.deleteItemFromTheBasket(productNameFromTheGrid)
    expect(presenceOfDeletedItemInTheBasket).toBeFalsy()
})

// test.skip("Cart icon updates with the item count test", async ({ pm }) => {


// })

// test.skip("Cart total is correctly calculated test", async ({ pm }) => {

// })

// test.skip("Removing a product from the cart test", async ({ pm }) => {

// })

// test.skip("'Continue Shopping' button in the cart test", async ({ pm }) => {

// })

// test.skip("Сart persistence across user sessions test", async ({ pm }) => {

// })

// test.skip("Check for a confirmation message after adding/removing items", async ({ pm }) => {

// })

// test.skip("Cart functionality with registered user", async ({ pm }) => {

// })

// test.skip("Cart functionality with guest user", async ({ pm }) => {

// })

// test.skip("Cart is emptied after the order is placed test", async ({ pm }) => {

// })

// test.skip("Users can add/edit shipping addresses test", async ({ pm }) => {

// })

// test.skip("Ability to review and edit the order before placing it test", async ({ pm }) => {

// })


test("Clear basket from shopping cart @order", async ({ pm }) => {
    await pm.onMainPage.addProductToTheBasketFromMainPage("0", "S", "Blue")
    await pm.onMainPage.addProductToTheBasketFromMainPage("1", "XL", "White")
    await pm.onMainPage.addProductToTheBasketFromMainPage("3", "L", "Black")

    await pm.onMainPage.inHeader.goToShoppingCartPageFromHeader()

    let countOfItemsInABasket = await pm.onShoppingCartPage.removeAllItemsFromShoppingCart()
    expect(countOfItemsInABasket).toBe(0)
})

test("Clear basket from header @order", async ({ pm }) => {
    await pm.onMainPage.addProductToTheBasketFromMainPage("0","S","Blue")
    await pm.onMainPage.addProductToTheBasketFromMainPage("1", "M", "White")
    await pm.onMainPage.addProductToTheBasketFromMainPage("3", "L", "Black")
    let countOfItemsInABasket = await pm.onMainPage.inHeader.clearBasketFromHeader()
    expect(countOfItemsInABasket).toBe(0)
})

test("Remove cheapest item @order", async ({ pm }) => {
    await pm.onMainPage.addProductToTheBasketFromMainPage("0", "S", "Blue")
    await pm.onMainPage.addProductToTheBasketFromMainPage("1", "M", "White")
    await pm.onMainPage.addProductToTheBasketFromMainPage("3", "L", "Black")
    await pm.onMainPage.inHeader.goToShoppingCartPageFromHeader()

    let cheapestItemInTheBasketAfterRemoval = await pm.onShoppingCartPage.removeCheapestItem()
    expect(cheapestItemInTheBasketAfterRemoval).toBe(34)

})

test("Place order @order", async ({ pm })=>{
    await pm.onMainPage.inHeader.createAnAccountButtonClick()
    await pm.onSignUpPage.fillDataAndCreateAnAccount(UserDataWithUniqueEmailAndPass)
    await pm.onSignUpPage.inHeader.logoButtonClick()

    await pm.onMainPage.addProductToTheBasketFromMainPage("1", "M", "White");
    await pm.onMainPage.addProductToTheBasketFromMainPage("3", "L", "Black");
    await pm.onCheckoutPage.inHeader.goToCheckoutPageFromHeader()
    await pm.onCheckoutPage.fillShippingDetails(shippingAddressData)
    const SuccessNotificationAfterPlacingOrder = await pm.onCheckoutPage.placeOrder()
    expect(SuccessNotificationAfterPlacingOrder).toContain('Thank you for your purchase!')
})

})
