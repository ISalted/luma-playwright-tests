import { test, expect } from "../fixtures/baseFixtures"
import * as userData from "../data/userData";

/**
 * @testCase Sign In from Main Header with Existing User @signin
 * @description Validates the sign-in process from the main header using existing user credentials.
 * STR:
 *  0. "Before" steps are stored in the pm fixture
 *  1. Click "Sign In" button in the header
 *  2. Sign in from the header with existing user data and clear cookies
 *  3. Get the welcome message from the header
 *  4. Verify that the welcome message contains the expected text
 */
test('Sign In from Main Header Validation @signin @Tf771b398', async ({ pm }) => {

    await pm.onMainPage.inHeader.clickSignInBtn()
    await pm.onSignInPage.fillDataAndSignIn(userData.EXISTING_USER, 'clearCoockie')
    let welcomeMssgFromHeader = await pm.onMainPage.inHeader.getWelcomeMsg()

    expect(welcomeMssgFromHeader).toContain("Welcome")
})

/**
 * @testCase Sign In from Checkout Page Validation @signin
 * @description Validates the sign-in process from the checkout page using existing user credentials.
 * STR:
 *  0. Before steps are stored in the pm fixture
 *  1. Add products to the basket from the product grid.
 *  2. Navigate to the checkout page from the header.
 *  3. Sign in from the checkout page using existing user data.
 *  4. Get the shipping address information.
 *  5. Verify that the shipping address information contains "Pennsylvania Avenue NW".
 */
test("Sign In from Checkout Page Validation @signin @T5202493c", async ({ pm }) => {
    const listProductData = await pm.onMainPage.inProductList.getProductData()

    await pm.onMainPage.inProductList.addToCart(listProductData[0])
    await pm.onMainPage.inProductList.addToCart(listProductData[0], 3, 1)
    await pm.onMainPage.inHeader.navigateToCheckoutPage()
    await pm.onCheckoutPage.signInFromCheckout(userData.EXISTING_USER)
    const shippingAddressInformation = await pm.onCheckoutPage.getShippingAddressInformation()

    expect(shippingAddressInformation).toContain("Pennsylvania Avenue NW")
})

/**
 * @testCase Sign In with Incorrect Email Validation @signin
 * @description Validates the sign-in process with incorrect email data.
 * STR:
 *  0. "Before" steps are stored in the pm fixture
 *  1. Click "Sign In" button in the header
 *  2. Attempt to sign in with unregistered email data
 *  3. Get unsuccessful message after sign-in
 *  4. Verify that the unsuccessful message contains "The account sign-in was incorrect"
 */
test("Sign In with Unregistered Email Validation @signin @T88ea9c23", async ({ pm }) => {

    await pm.onMainPage.inHeader.clickSignInBtn()
    await pm.onSignInPage.fillWrongData(userData.UNREGISTERED_USER)
    let unsuccessfulMssg = await pm.onSignInPage.getUnsuccessfulMsg()
    expect(unsuccessfulMssg).toContain("The account sign-in was incorrect")
})

/**
 * @testCase Sign In with Incorrect Email Validation @signin
 * @description Validates the sign-in process with invalid email data.
 * STR:
 *  0. "Before" steps are stored in the pm fixture
 *  1. Click "Sign In" button in the header
 *  2. Attempt to sign in with invalid email data
 *  3. Get unsuccessful message after sign-in
 *  4. Verify that the unsuccessful message contains "The account sign-in was incorrect"
 */
test("Sign In with Invalid Email Validation @signin @T312e9f5a", async ({ pm }) => {

    await pm.onMainPage.inHeader.clickSignInBtn()
    await pm.onSignInPage.fillWrongData(userData.INVALID_EMAIL)
    let unsuccessfulMssg = await pm.onSignInPage.getEmailErrorMsg()

    expect(unsuccessfulMssg).toContain("Please enter a valid email address (Ex: johndoe@domain.com).")
})

/**
 * @testCase Sign In with Incorrect Pass Validation @signin
 * @description Validates the sign-in process with incorrect password data.
 * STR:
 *  0. "Before" steps are stored in the pm fixture
 *  1. Click "Sign In" button in the header
 *  2. Attempt to sign in with incorrect password data
 *  3. Get unsuccessful message after sign-in
 *  4. Verify that the unsuccessful message contains "The account sign-in was incorrect"
 */
test("Sign In with Incorrect Pass Validation @signin @Td6e39774", async ({ pm }) => {

    await pm.onMainPage.inHeader.clickSignInBtn()
    await pm.onSignInPage.fillWrongData(userData.INCORRECT_PASS_USER)
    let unsuccessfulMssg = await pm.onSignInPage.getUnsuccessfulMsg()
    expect(unsuccessfulMssg).toContain("The account sign-in was incorrect")
})

/**
 * @testCase Test login with empty email @signin
 * @description Validates the sign-in process with an empty email field.
 * STR:
 *  0. "Before" steps are stored in the pm fixture
 *  1. Click the "Sign In" button in the header
 *  2. Attempt to sign in with an empty email
 *  3. Get the error message for the empty email
 *  4. Verify that the error message contains the expected text
 */
test("Test login with empty email @signin @Tbde9b9f9", async ({ pm }) => {
    await pm.onMainPage.inHeader.clickSignInBtn()
    await pm.onSignInPage.fillWrongData(userData.EMPTY_EMAIL_USER)
    let unsuccessfulMssg = await pm.onSignInPage.getEmailErrorMsg()
    expect(unsuccessfulMssg).toContain("This is a required field.")
})

/**
 * @testCase Test login with empty password @signin
 * @description Validates the sign-in process with an empty password field.
 * STR:
 *  0. "Before" steps are stored in the pm fixture
 *  1. Click the "Sign In" button in the header
 *  2. Attempt to sign in with an empty password
 *  3. Get the error message for the empty password
 *  4. Verify that the error message contains the expected text
 */
test("Test Login with Empty Pass @signin @T8cc86174", async ({ pm }) => {
    await pm.onMainPage.inHeader.clickSignInBtn()
    await pm.onSignInPage.fillWrongData(userData.EMPTY_PASS_USER)
    let unsuccessfulMssg = await pm.onSignInPage.getPassErrorMsg()
    expect(unsuccessfulMssg).toContain("This is a required field.")
})

