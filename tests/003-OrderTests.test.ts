import { test, expect } from "../fixtures/baseFixtures"
import { UserDataWithUniqueEmailAndPass2, shippingAddressData } from "../data/userData"

test.describe('Order tests', () => {

test("AddToCart button works on main @order", async ({ pm }) => {
    let productNameFromTheGrid = await pm.onMainPage.inProductGrid.addToBasketAndReturnHisName(3, 3, 0)
    let productItemNameFromBasket = await pm.onMainPage.inHeader.getProductItemNameFromBasket(productNameFromTheGrid)
    expect(productNameFromTheGrid).toContain(productItemNameFromBasket)

})

test("Remove button in the shopping cart @order", async ({ pm }) => {
    let productNameFromTheGrid = await pm.onMainPage.inProductGrid.addToBasketAndReturnHisName(3, 3, 0)
    let presenceOfDeletedItemInTheBasket = await pm.onMainPage.inHeader.deleteItemFromTheBasket(productNameFromTheGrid)
    expect(presenceOfDeletedItemInTheBasket).toBeFalsy()
})



test("Cart icon updates with the item count test", async ({ pm }) => {
    await pm.onMainPage.inUiMenu.selectMenuItem("Women", "Tops")
    await pm.onMainPage.inProductGrid.addToBasketAndReturnHisName(1)
    await pm.onMainPage.inProductGrid.addToBasketAndReturnHisName(2)
    let basketCount = await pm.onMainPage.inHeader.getBasketCounter()
    expect(basketCount).toBe(2)



})

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
    await pm.onMainPage.inProductGrid.addToBasketAndReturnHisName(0, 1, 0)
    await pm.onMainPage.inProductGrid.addToBasketAndReturnHisName(1, 2, 1)
    await pm.onMainPage.inProductGrid.addToBasketAndReturnHisName(3, 3, 0)

    await pm.onMainPage.inHeader.goToShoppingCartPageFromHeader()

    let countOfItemsInABasket = await pm.onShoppingCartPage.removeAllItemsFromShoppingCart()
    expect(countOfItemsInABasket).toBe(0)
})

test("Clear basket from header @order", async ({ pm }) => {
    await pm.onMainPage.inProductGrid.addToBasketAndReturnHisName(0, 1, 0)
    await pm.onMainPage.inProductGrid.addToBasketAndReturnHisName(1, 2, 1)
    await pm.onMainPage.inProductGrid.addToBasketAndReturnHisName(3, 3, 0)
    let countOfItemsInABasket = await pm.onMainPage.inHeader.clearBasketFromHeader()
    expect(countOfItemsInABasket).toBe(0)
})

test("Remove cheapest item @order", async ({ pm }) => {
    await pm.onMainPage.inProductGrid.addToBasketAndReturnHisName(0, 1, 0)
    await pm.onMainPage.inProductGrid.addToBasketAndReturnHisName(1, 2, 1)
    await pm.onMainPage.inProductGrid.addToBasketAndReturnHisName(3, 3, 0)
    await pm.onMainPage.inHeader.goToShoppingCartPageFromHeader()

    let cheapestItemInTheBasketAfterRemoval = await pm.onShoppingCartPage.removeCheapestItem()
    expect(cheapestItemInTheBasketAfterRemoval).toBe(34)

})

test("Place order @order", async ({ pm })=>{
    await pm.onMainPage.inHeader.createAnAccountButtonClick()
    await pm.onSignUpPage.fillDataAndCreateAnAccount(UserDataWithUniqueEmailAndPass2)
    await pm.onSignUpPage.inHeader.logoButtonClick()

    await pm.onMainPage.inProductGrid.addToBasketAndReturnHisName(0, 1, 0);
    await pm.onMainPage.inProductGrid.addToBasketAndReturnHisName(1, 2, 1);
    await pm.onCheckoutPage.inHeader.goToCheckoutPageFromHeader()
    await pm.onCheckoutPage.fillShippingDetails(shippingAddressData)
    const SuccessNotificationAfterPlacingOrder = await pm.onCheckoutPage.placeOrder()
    expect(SuccessNotificationAfterPlacingOrder).toContain('Thank you for your purchase!')
})

})
