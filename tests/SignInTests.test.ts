import { test, expect } from "../fixtures/baseFixtures"

import { ExistingUsersData, NonExistentUserData } from "../data/userData"

test.only("Sign In test", async ({ pm, page }) => {
    /*
    Check Sign In
    STR:
    1. Open host URL https://magento.softwaretestingboard.com
    2. Clear coookies
    3. Click “Sign in” button
    4. Log in as a registered user
    5. Check the welcome text
    */

    await pm.onMainPage().inHeader.signInButtonClick()
    await pm.onSignInPage().signInFromHeader(ExistingUsersData, 'Clear Coockie')
    let welcomeMessageFromHeader = await pm.onMainPage().inHeader.getWelcomeMessageFromHeader()

    expect(welcomeMessageFromHeader).toContain("Welcome")
})

test.only("Sign In with wrong data Test", async ({ pm }) => {
    /*
    Check Sign In
    STR:
    1. Open host URL https://magento.softwaretestingboard.com
    2. Clear coookies
    3. Click “Sign in” button
    4. Log in as a user with wrong email and pass
    5. Check allert message
    */

    await pm.onMainPage().inHeader.signInButtonClick()
    await pm.onSignInPage().signInWithWrongData(NonExistentUserData)
    let unsuccessfulMessage = await pm.onSignInPage().getUnsuccessfulMessageAfterSignIn()
    expect(unsuccessfulMessage).toContain("The account sign-in was incorrect")
})

test.only("Sign In from checkOut page Test", async ({ pm }) => {
    await pm.onMainPage().addProductToTheBasketFromMainPage(0, "M", "Blue")
    await pm.onMainPage().addProductToTheBasketFromMainPage(1, "L", "White")
    await pm.onMainPage().inHeader.goToCheckoutPageFromHeader()
    await pm.onCheckoutPage().loginFromCheckout(ExistingUsersData)
    const shippingAddressInformation = await pm.onCheckoutPage().getShippingAddressInformation()

    expect(shippingAddressInformation).toContain("Pennsylvania Avenue NW")
})

// test("Check login with an incorrect username/email", async ({ pm }) => {

// })

// test("Login with an incorrect password", async ({ pm }) => {

// })

// test("Test login with empty data", async ({ pm }) => {

// })

// test("Verify the 'LogOut' functionality", async ({ pm }) => {

// })


