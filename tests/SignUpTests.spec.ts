import { test, expect } from "@playwright/test"
import { PageManager } from "../page-objects/helpers/pageManager";

import { ExistingUsersData, UserDataWithWrongEmail, UserDataWithUniqueEmailAndPass, UserDataWithWrongPass } from "../data/userData"

test.beforeEach(async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onMainPage().visitMainPage()
    await pm.onMainPage().inHeader.writeForUsLink.waitFor()
    await pm.onMainPage().clearCookies()

})

test("Sign Up new user Test", async ({ page }) => {
    /*
    Check Sign In
    STR:
    1. Clear coookies
    2. Open host URL https://magento.softwaretestingboard.com/customer/account/create/
    3. Fill in all fields with valid data.
    4. Press the "Create an Account" button.
    5. Check success message
    */

    const pm = new PageManager(page)

    await pm.onMainPage().inHeader.createAnAccountButtonClick()
    await pm.onSignUpPage().fillDataAndCreateAnAccount(UserDataWithUniqueEmailAndPass)
    let successMessageFromMyAccountPage = await pm.onMyAccountPage().getSuccessfulMessageAfterRegistration()

    expect(successMessageFromMyAccountPage).toContain("Thank you for registering")
})

test("Sign Up existing user Test", async ({ page }) => {
    /*
    Check Sign In
    STR:
    1. Clear coookies
    2. Open host URL https://magento.softwaretestingboard.com/customer/account/create/
    3. Fill in the fields with the data of a user who already exists.
    4. Press the "Create an Account" button.
    5. Check allert message
    */

    const pm = new PageManager(page)

    await pm.onMainPage().inHeader.createAnAccountButtonClick()
    await pm.onSignUpPage().fillDataAndCreateAnAccount(ExistingUsersData)
    let unsuccessfulMessageFromSignUpPage = await pm.onSignUpPage().getExistingAccountMessage()
    expect(unsuccessfulMessageFromSignUpPage).toContain("There is already an account with this email address")
})

test("Sign Up with an incorrect email", async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onMainPage().inHeader.createAnAccountButtonClick()
    await pm.onSignUpPage().fillDataAndCreateAnAccount(UserDataWithWrongEmail)
    let invalidEmailMessage = await pm.onSignUpPage().getInvalidEmailMessage()
    expect(invalidEmailMessage).toContain("Please enter a valid email address (Ex: johndoe@domain.com).")

})

test.only("Sign up with an incorrect password", async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onMainPage().inHeader.createAnAccountButtonClick()
    await pm.onSignUpPage().fillDataAndCreateAnAccount(UserDataWithWrongPass)
    let invalidEmailMessage = await pm.onSignUpPage().getInvalidPasswordMessage()
    expect(invalidEmailMessage).toContain("Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.")

})

// test("Successful user registration with valid information", async ({ page }) => {

// })

// test("Verify password strength validation during registration", async ({ page }) => {

// })





