import { test, expect } from "../fixtures/baseFixtures"
import { ExistingUsersData as ExistingUserData, NonExistentUserData } from "../data/userData"
const SignInFrommain = 'Sign In from main @signin'


/*
Check Sign In
STR:
1. Open host URL https://magento.softwaretestingboard.com
2. Clear coookies
3. Click “Sign in” button
4. Log in as a registered user
5. Check the welcome text
*/
test('Sign In from main @signin', async ({ pm }) => {
    // const snapshot = await page.accessibility.snapshot();
    // console.log(snapshot);

    await pm.onMainPage.inHeader.signInButtonClick()
    await pm.onSignInPage.signInFromHeader(ExistingUserData, 'Clear Coockie')
    let welcomeMessageFromHeader = await pm.onMainPage.inHeader.getWelcomeMessageFromHeader()

    expect(welcomeMessageFromHeader).toContain("Welcome")
})

/*
Check Sign In
STR:
1. Open host URL https://magento.softwaretestingboard.com
2. Clear coookies
3. Click “Sign in” button
4. Log in as a user with wrong email and pass
5. Check allert message
*/
test("Sign In with wrong data @signin", async ({ pm }) => {

    await pm.onMainPage.inHeader.signInButtonClick()
    await pm.onSignInPage.signInWithWrongData(NonExistentUserData)
    let unsuccessfulMessage = await pm.onSignInPage.getUnsuccessfulMessageAfterSignIn()
    expect(unsuccessfulMessage).toContain("The account sign-in was incorrect")
})

test("Sign In from checkOut page @signin", async ({ pm }) => {

    await pm.onMainPage.inProductGrid.addToBasketAndReturnHisName(0, 2, 0)
    await pm.onMainPage.inProductGrid.addToBasketAndReturnHisName(1, 3, 1)
    await pm.onMainPage.inHeader.goToCheckoutPageFromHeader()
    await pm.onCheckoutPage.loginFromCheckout(ExistingUserData)
    const shippingAddressInformation = await pm.onCheckoutPage.getShippingAddressInformation()

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

