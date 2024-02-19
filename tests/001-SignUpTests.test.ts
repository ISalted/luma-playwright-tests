import { test, expect } from "../fixtures/baseFixtures"
import { ExistingUsersData, UserDataWithWrongEmail, UserDataWithUniqueEmailAndPass, UserDataWithWrongPass } from "../data/userData"

test.describe('Sign Up tests', () => {

test("Sign Up new user @signup", async ({ pm }) => {
    /*
    Check Sign In
    STR:
    1. Clear coookies
    2. Open host URL https://magento.softwaretestingboard.com/customer/account/create/
    3. Fill in all fields with valid data.
    4. Press the "Create an Account" button.
    5. Check success message
    */


    await pm.onMainPage.inHeader.createAnAccountButtonClick()
    await pm.onSignUpPage.fillDataAndCreateAnAccount(UserDataWithUniqueEmailAndPass)
    let successMessageFromMyAccountPage = await pm.onMyAccountPage.getSuccessfulMessageAfterRegistration()

    expect(successMessageFromMyAccountPage).toContain("Thank you for registering")
})

test("Sign Up existing user @signup", async ({ pm }) => {
    /*
    Check Sign In
    STR:
    1. Clear coookies
    2. Open host URL https://magento.softwaretestingboard.com/customer/account/create/
    3. Fill in the fields with the data of a user who already exists.
    4. Press the "Create an Account" button.
    5. Check allert message
    */

    await pm.onMainPage.inHeader.createAnAccountButtonClick()
    await pm.onSignUpPage.fillDataAndCreateAnAccount(ExistingUsersData)
    let unsuccessfulMessageFromSignUpPage = await pm.onSignUpPage.getExistingAccountMessage()
    expect(unsuccessfulMessageFromSignUpPage).toContain("There is already an account with this email address")
})

test("Sign Up with an incorrect email @signup", async ({ pm }) => {

    await pm.onMainPage.inHeader.createAnAccountButtonClick()
    await pm.onSignUpPage.fillDataAndCreateAnAccount(UserDataWithWrongEmail)
    let invalidEmailMessage = await pm.onSignUpPage.getInvalidEmailMessage()
    expect(invalidEmailMessage).toContain("Please enter a valid email address (Ex: johndoe@domain.com).")

})

test("Sign up with an incorrect password @signup", async ({ pm }) => {

    await pm.onMainPage.inHeader.createAnAccountButtonClick()
    await pm.onSignUpPage.fillDataAndCreateAnAccount(UserDataWithWrongPass)
    let invalidEmailMessage = await pm.onSignUpPage.getInvalidPasswordMessage()
    expect(invalidEmailMessage).toContain("Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.")

})

// test("Successful user registration with valid information", async ({ page }) => {

// })




// test("Verify password strength validation during registration", async ({ pm }) => {

// })

})
