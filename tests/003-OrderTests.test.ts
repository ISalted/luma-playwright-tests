import { test, expect } from "../fixtures/baseFixtures"
import * as userData from "../data/userData";
import { th } from "@faker-js/faker";

/**
 * @testCase AddToCart Button Functionality on Main Page
 * STR:
 *  0. "Before" steps are stored in the pm fixture.
 *  1. Add a product to the basket from the product grid.
 *  2. Get the name of the product added to the basket.
 *  3. Get the name of the product item from the basket.
 *  4. Verify that the product name retrieved from the grid contains the product name from the basket.
 */
test("AddToBasket Button Functionality @order", async ({ pm }) => {

    let itemDataCollector = await pm.onMainPage.inProductGrid.addToBasketReturnItsData(3, 3, 0)
    let basketItemName = await pm.onMainPage.inHeader.getBasketProductName(0)

    expect(itemDataCollector.name).toContain(basketItemName)

})
/**
 * @testCase Remove Button Functionality in the Shopping Cart
 * STR:
 *  0. "Before" steps are stored in the pm fixture.
 *  1. Add a product to the basket from the product grid.
 *  2. Get the name of the product added to the basket.
 *  3. Attempt to remove the item from the basket using the Remove button.
 *  4. Verify that the item is no longer present in the basket.
 */
test("Remove Button Functionality in the Shopping Cart @order", async ({ pm }) => {
    let itemDataCollector = await pm.onMainPage.inProductGrid.addToBasketReturnItsData(3, 3, 0 )
    let isItemInBasket = await pm.onMainPage.inHeader.deleteProductFromTheBasket(itemDataCollector.name)

    expect(isItemInBasket).toBeFalsy()
})

/**
 * @testCase Quantity of products in basket updates after addition
 * STR:
 *  0. "Before" steps are stored in the pm fixture.
 *  1. Navigate to the Women > Tops section from the UI menu.
 *  2. Add two products to the basket from the product grid.
 *  3. Get the item count displayed on the cart icon.
 *  4. Verify that the quantity of items in the basket is correct.
 */
test("Quantity of Products in Basket Updates after Addition @order", async ({ pm }) => {

    await pm.onMainPage.inUiMenu.selectMenuItem("Women", "Tops")
    await pm.onMainPage.inProductGrid.addToBasketReturnItsData(1)
    await pm.onMainPage.inProductGrid.addToBasketReturnItsData(2)
    let basketCount = await pm.onMainPage.inHeader.getBasketCounter()

    expect(basketCount).toBe(2)
})

/**
 * @testCase Cart Total Calculation Test
 * STR:
 *  0. "Before" steps are stored in the pm fixture.
 *  1. Add multiple products to the cart/basket.
 *  2. Calculate the total price sum of the products.
 *  3. Get the subtotal from the cart.
 *  4. Verify that the total price sum matches the cart subtotal.
 */
test("Cart total is correctly calculated test @order", async ({ pm }) => {
    let productPrices: number[] = []

    productPrices.push((await pm.onMainPage.inProductGrid.addToBasketReturnItsData(0)).priceInt)
    productPrices.push((await pm.onMainPage.inProductGrid.addToBasketReturnItsData(1, 1, 2)).priceInt)
    productPrices.push((await pm.onMainPage.inProductGrid.addToBasketReturnItsData(2, 2, 0)).priceInt)
    productPrices.push((await pm.onMainPage.inProductGrid.addToBasketReturnItsData(3)).priceInt)
    productPrices.push((await pm.onMainPage.inProductGrid.addToBasketReturnItsData(3)).priceInt)

    const totalPriceSum = pm.sumArray(productPrices)
    const cartSubtotal = await pm.onMainPage.inHeader.getCartSubtotalFromBasket()

    expect(totalPriceSum).toBe(cartSubtotal)
})

/**
* @testCase Cart Persistence Across User Sessions Test
* STR:
*   1. "Before" steps are stored in the pm fixture.
*   2. Create a new user account.
*   3. Add products to the cart and retrieve the basket data after the first sign-in.
*   4. Sign out from the user account.
*   5. Sign in again with the same credentials.
*   6. Retrieve the basket data after the second sign-in.
*   7. Verify that the basket data after the first sign-in matches the basket data after the second sign-in.
*/
test("Сart persistence across user sessions @order", async ({ pm }) => {
    let userCredential = userData.UNIQUE_EMAIL_AND_PASS_USER()

    await pm.onMainPage.inHeader.clickCreateAccountBtn()
    await pm.onSignUpPage.fillDataAndCreateAnAccount(userCredential)
    await pm.onMainPage.inHeader.clickLogoBtn()
    await pm.onMainPage.inProductGrid.addToBasketReturnItsData(0)
    await pm.onMainPage.inProductGrid.addToBasketReturnItsData(3)
    let basketDataAfterFirstSignIn = await pm.onMainPage.inHeader.getBasketData()

    await pm.onMainPage.inHeader.signOut()
    await pm.onMainPage.inHeader.clickSignInBtn()
    await pm.onSignInPage.fillDataAndSignIn(userCredential, 'Clear Coockie')
    let basketDataAfterSecondSignIn = await pm.onMainPage.inHeader.getBasketData()

    expect(basketDataAfterFirstSignIn).toEqual(basketDataAfterSecondSignIn);
})

/**
 * @testCase Check for a confirmation message after adding product
 * STR:
 *  0. "Before" steps are stored in the pm fixture.
 *  1. Add the product to the shopping cart.
 *  2. Verify the success alert message containing the product name.
 *  3. Add another product to the shopping cart.
 *  4. Verify the success alert message containing the new product name.
 */
test("Check For a Confirmation Message After Adding Product @order", async ({ pm }) => {
    let productName = (await pm.onMainPage.inProductGrid.addToBasketReturnItsData(0)).name
    let successAllertMsg = await pm.onMainPage.inProductGrid.getSuccessAllertMsg()
    expect(successAllertMsg).toContain(`You added ${productName} to your shopping cart.`)

    productName = (await pm.onMainPage.inProductGrid.addToBasketReturnItsData(3)).name
    successAllertMsg = await pm.onMainPage.inProductGrid.getSuccessAllertMsg()
    expect(successAllertMsg).toContain(`You added ${productName} to your shopping cart.`)
})

/**
 * @testCase Add To Basket with Registered Use
 * STR:
 *  0. "Before" steps are stored in the pm fixture.
 *  1. Click on the "Create Account" button.
 *  2. Fill in the required data and create a new account for the user.
 *  3. Click on the logo button to return to the main page.
 *  4. Add a product to the basket as a Registered User.
 *  5. Get the name of the product in the grid.
 *  6. Get the name of the product in the basket.
 *  7. Verify that the previously added product name contains the product name in the basket.
 */
test("Add To Basket with Registered User @order", async ({ pm }) => {

    await pm.onMainPage.inHeader.clickCreateAccountBtn()
    await pm.onSignUpPage.fillDataAndCreateAnAccount(userData.UNIQUE_EMAIL_AND_PASS_USER())
    await pm.onMainPage.inHeader.clickLogoBtn()

    let productNameInGrid = (await pm.onMainPage.inProductGrid.addToBasketReturnItsData(0)).name
    let productNameInBasket = (await pm.onMainPage.inHeader.getBasketData()).ItemsData[0].name

    expect(productNameInGrid).toContain(productNameInBasket)
})

/**
 * @testCase Add To Basket with Guest User
 * STR:
 *  0. "Before" steps are stored in the pm fixture.
 *  1. Add a product to the basket as a Guest User.
 *  2. Get the name of the product in the grid.
 *  3. Get the name of the product in the basket.
 *  4. Verify that the previously added product name contains the product name in the basket.
 */
test("Add To Basket with Guest User @order", async ({ pm }) => {

    let productNameInGrid = (await pm.onMainPage.inProductGrid.addToBasketReturnItsData(0)).name
    let productNameInBasket = (await pm.onMainPage.inHeader.getBasketData()).ItemsData[0].name

    expect(productNameInGrid).toContain(productNameInBasket)
})

/**
 * @testCase Basket is emptied after placing an order
 * STR:
 *  0. Before steps are stored in the pm fixture.
 *  1. Click on the "Create Account" button.
 *  2. Fill in the required data and create a new account for the user.
 *  3. Click on the logo button to return to the main page.
 *  4. Add a product to the basket from the product grid.
 *  5. Navigate to the checkout page.
 *  6. Fill in the shipping details.
 *  7. Get the current count of items in the basket after placing the order.
 *  8. Verify that the basket count after ordering is 0, indicating that the basket is emptied.
 */
test("Basket is Emptied after Placing an Order @order", async ({ pm }) => {

    await pm.onMainPage.inHeader.clickCreateAccountBtn()
    await pm.onSignUpPage.fillDataAndCreateAnAccount(userData.UNIQUE_EMAIL_AND_PASS_USER())
    await pm.onSignUpPage.inHeader.clickLogoBtn()
    await pm.onMainPage.inProductGrid.addToBasketReturnItsData(0, 1, 0);
    await pm.onCheckoutPage.inHeader.navigateToCheckoutPage()
    await pm.onCheckoutPage.fillShippingDetailsAndRerurnItsData(userData.STANDART_SHIPPING_ADDRESS_DATA)
    await pm.onCheckoutPage.placeOrder()
    await pm.onSignUpPage.inHeader.clickLogoBtn()
    const basketCountAfterOrdering = await pm.onCheckoutPage.inHeader.getBasketCounter()

    expect(basketCountAfterOrdering).toBe(0)
})

test("Users can Add Shipping Addresses @order", async ({ pm }) => {

    await pm.onMainPage.inHeader.clickCreateAccountBtn()
    await pm.onSignUpPage.fillDataAndCreateAnAccount(userData.UNIQUE_EMAIL_AND_PASS_USER())
    await pm.onSignUpPage.inHeader.clickLogoBtn()
    await pm.onMainPage.inProductGrid.addToBasketReturnItsData(0, 1, 0);
    await pm.onCheckoutPage.inHeader.navigateToCheckoutPage()
    let ShippingDetailsData = await pm.onCheckoutPage.fillShippingDetailsAndRerurnItsData(userData.STANDART_SHIPPING_ADDRESS_DATA)

    expect(ShippingDetailsData).toContain(userData.STANDART_SHIPPING_ADDRESS_DATA.firstName)
    expect(ShippingDetailsData).toContain(userData.STANDART_SHIPPING_ADDRESS_DATA.lastName)
    expect(ShippingDetailsData).toContain(userData.STANDART_SHIPPING_ADDRESS_DATA.address)
    expect(ShippingDetailsData).toContain(userData.STANDART_SHIPPING_ADDRESS_DATA.city)
    expect(ShippingDetailsData).toContain(userData.STANDART_SHIPPING_ADDRESS_DATA.zip)
    expect(ShippingDetailsData).toContain(userData.STANDART_SHIPPING_ADDRESS_DATA.phone)
})

test("Users can Edit Shipping Addresses @order", async ({ pm }) => {
    await pm.onMainPage.inHeader.clickCreateAccountBtn()
    await pm.onSignUpPage.fillDataAndCreateAnAccount(userData.UNIQUE_EMAIL_AND_PASS_USER())
    await pm.onSignUpPage.inHeader.clickLogoBtn()
    await pm.onMainPage.inProductGrid.addToBasketReturnItsData(0, 1, 0)
    await pm.onCheckoutPage.inHeader.navigateToCheckoutPage()
    await pm.onCheckoutPage.fillShippingDetailsAndRerurnItsData(userData.STANDART_SHIPPING_ADDRESS_DATA)
    await pm.onCheckoutPage.visitCheckoutPage()
    let ShippingInformationDetails = await pm.onCheckoutPage.getValuesOfShippingInformationDetails()
    await pm.onCheckoutPage.fillShippingDetailsAndRerurnItsData(userData.UNIQUE_SHIPPING_ADDRESS_DATA)
    await pm.onCheckoutPage.visitCheckoutPage()
    let editedShippingInformationDetails = await pm.onCheckoutPage.getValuesOfShippingInformationDetails()

    expect(ShippingInformationDetails).not.toEqual(editedShippingInformationDetails);
    expect(Object.values(userData.UNIQUE_SHIPPING_ADDRESS_DATA)).toEqual(editedShippingInformationDetails)
})

// test.skip("Ability to review and edit the order before placing @order", async ({ pm }) => {

// })

/**
 * @testCase Clear Basket from Shopping Cart
 * STR:
 *  0. "Before" steps are stored in the pm fixture.
 *  1. Add a products to the basket from the product grid
 *  4. Navigate to the shopping cart page from the header.
 *  5. Remove all items from the shopping cart.
 *  6. Verify that the count of items in the basket is 0.
 */
test("Clear Basket from Shopping Cart @order", async ({ pm }) => {
    await pm.onMainPage.inProductGrid.addToBasketReturnItsData(0, 1, 0)
    await pm.onMainPage.inProductGrid.addToBasketReturnItsData(1, 2, 1)
    await pm.onMainPage.inProductGrid.addToBasketReturnItsData(3, 3, 0)
    await pm.onMainPage.inHeader.navigateToShoppingCartPage()
    let countOfItemsInABasket = await pm.onShoppingCartPage.clearShoppingCart()

    expect(countOfItemsInABasket).toBe(0)
})

/**
 * @testCase Clear Basket from Header
 * STR:
 *  0. "Before" steps are stored in the pm fixture.
 *  1. Add a products to the basket from the product grid.
 *  4. Attempt to clear the basket from the header.
 *  5. Verify that the count of items in the basket is 0.
 */
test("Clear Basket from Header @order", async ({ pm }) => {
    await pm.onMainPage.inProductGrid.addToBasketReturnItsData(0, 1, 0)
    await pm.onMainPage.inProductGrid.addToBasketReturnItsData(1, 2, 1)
    await pm.onMainPage.inProductGrid.addToBasketReturnItsData(3, 3, 0)
    let countOfItemsInABasket = await pm.onMainPage.inHeader.clearBasket()

    expect(countOfItemsInABasket).toBe(0)
})

/**
 * @testCase Remove Cheapest Item from Shopping Cart
 * STR:
 *  0. "Before" steps are stored in the pm fixture.
 *  1. Add a products to the basket from the product grid.
 *  4. Navigate to the shopping cart page from the header.
 *  5. Remove the cheapest item from the shopping cart.
 *  6. Verify that the cheapest item has been successfully removed from the basket.
 */
test("Remove cheapest item @order", async ({ pm }) => {
    await pm.onMainPage.inProductGrid.addToBasketReturnItsData(0, 1, 0)
    await pm.onMainPage.inProductGrid.addToBasketReturnItsData(1, 2, 1)
    await pm.onMainPage.inProductGrid.addToBasketReturnItsData(3, 3, 0)
    await pm.onMainPage.inHeader.navigateToShoppingCartPage()
    let cheapestItemInTheBasketAfterRemoval = await pm.onShoppingCartPage.removeCheapestItem()

    expect(cheapestItemInTheBasketAfterRemoval).toBe(34)
})

/**
 * @testCase Place Order
 * STR:
 *  0. "Before" steps are stored in the pm fixture.
 *  1. Click "Create an Account" button in the header.
 *  2. Fill in registration data and create an account with unique email and password.
 *  3. Click the logo to return to the main page.
 *  4. Add a productи to the basket from the product grid.
 *  6. Navigate to the checkout page from the header.
 *  7. Fill in shipping details.
 *  8. Place the order.
 *  9. Verify that a success notification is displayed after placing the order.
 */
test("Place order @order", async ({ pm })=>{
    await pm.onMainPage.inHeader.clickCreateAccountBtn()
    await pm.onSignUpPage.fillDataAndCreateAnAccount(userData.UNIQUE_EMAIL_AND_PASS_USER())
    await pm.onSignUpPage.inHeader.clickLogoBtn()
    await pm.onMainPage.inProductGrid.addToBasketReturnItsData(0, 1, 0);
    await pm.onMainPage.inProductGrid.addToBasketReturnItsData(1, 2, 1);
    await pm.onCheckoutPage.inHeader.navigateToCheckoutPage()
    await pm.onCheckoutPage.fillShippingDetailsAndRerurnItsData(userData.STANDART_SHIPPING_ADDRESS_DATA)
    const SuccessNotificationAfterPlacingOrder = await pm.onCheckoutPage.placeOrder()


    expect(SuccessNotificationAfterPlacingOrder).toContain('Thank you for your purchase!')
})
