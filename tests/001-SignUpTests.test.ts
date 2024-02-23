import { test, expect } from "../fixtures/baseFixtures"
import * as userData from "../data/userData";

/**
 * @testCase Successful User Registration with Valid Information
 * STR:
 *  0. "Before" steps are stored in the pm fixture
 *  1. Click "Create an Account" button in the header
 *  2. Fill in registration data and create an account with unique email and password
 *  3. Get success message after registration from My Account page
 *  4. Verify that the success message contains "Thank you for registering"
 */

test("Successful User Registration with Valid Information @signup", async ({ pm }) => {

    await pm.onMainPage.inHeader.clickCreateAccountBtn()
    await pm.onSignUpPage.fillDataAndCreateAnAccount(userData.UNIQUE_EMAIL_AND_PASS_USER())
    let successMessageFromMyAccountPage = await pm.onMyAccountPage.getRegistrationSuccessMsg()

    expect(successMessageFromMyAccountPage).toContain("Thank you for registering")
})

/**
* @testCase Sign Up Existing User Validation
* STR:
*   0. "Before" steps are stored in the pm fixture
*   1. Click "Create an Account" button in the header
*   2. Fill in registration data and attempt to create an account with existing user data
*   3. Get unsuccessful message from sign up page indicating existing account
*   4. Verify that the unsuccessful message contains "There is already an account with this email address"
*/

test("Sign Up Existing User Validation @signup", async ({ pm }) => {

    await pm.onMainPage.inHeader.clickCreateAccountBtn()
    await pm.onSignUpPage.fillDataAndCreateAnAccount(userData.EXISTING_USER)
    let unsuccessfulMessageFromSignUpPage = await pm.onSignUpPage.getExistingAccountMessage()

    expect(unsuccessfulMessageFromSignUpPage).toContain("There is already an account with this email address")
})

/**
* @testCase Sign Up with Incorrect Email Validation
* STR:
*   0. "Before" steps are stored in the pm fixture
*   1. Click "Create an Account" button in the header
*   2. Fill in data and create an account with incorrect email
*   3. Check for invalid email message
*/

test("Sign Up with Incorrect Email Validation @signup", async ({ pm }) => {

    await pm.onMainPage.inHeader.clickCreateAccountBtn()
    await pm.onSignUpPage.fillDataAndCreateAnAccount(userData.INVALID_EMAIL)
    let invalidEmailMessage = await pm.onSignUpPage.getInvalidEmailMessage()
    expect(invalidEmailMessage).toContain("Please enter a valid email address (Ex: johndoe@domain.com).")

})

/**
* @testCase Sign Up with Incorrect Password Validation
* STR:
*   0. "Before" steps are stored in the pm fixture
*   1. Click "Create an Account" button in the header
*   2. Fill in registration data and attempt to create an account with an invalid password
*   3. Get invalid password message from sign up page
*   4. Verify that the invalid password message contains the expected text
*/

test("Sign Up with Incorrect Password Validation @signup", async ({ pm }) => {

    await pm.onMainPage.inHeader.clickCreateAccountBtn()
    await pm.onSignUpPage.fillDataAndCreateAnAccount(userData.INCORRECT_PASS_USER)
    let invalidEmailMessage = await pm.onSignUpPage.getInvalidPasswordMessage()

    expect(invalidEmailMessage).toContain("Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.")
})

/**
 * @testCase Sign Up with Non-Same Value Validation
 * STR:
 *  0. "Before" steps are stored in the pm fixture
 *  1. Click "Create an Account" button in the header
 *  2. Fill in registration data and create an account with different password and confirm password values
 *  3. Get the invalid confirm password message from the sign-up page
 *  4. Verify that the invalid confirm password message contains the expected text
 */

test("Sign Up with Non same value Validation @signup", async ({ pm }) => {

    await pm.onMainPage.inHeader.clickCreateAccountBtn()
    await pm.onSignUpPage.fillDataAndCreateAnAccount(userData.DIFFERENT_PASS_USER)
    let invalidEmailMessage = await pm.onSignUpPage.getInvalidConfirmPasswordMessage()

    expect(invalidEmailMessage).toContain("Please enter the same value again.")
})

/**
 * @testCase Sign Up with Empty Email Validation
 * STR:
 *  0. "Before" steps are stored in the pm fixture
 *  1. Click "Create an Account" button in the header
 *  2. Fill in registration data with an empty email address and attempt to create an account
 *  3. Get the invalid email message from the sign-up page
 *  4. Verify that the invalid email message contains the expected text
 */

test("Sign Up with Empty Email Validation @signup", async ({ pm }) => {

    await pm.onMainPage.inHeader.clickCreateAccountBtn()
    await pm.onSignUpPage.fillDataAndCreateAnAccount(userData.EMPTY_EMAIL_USER)
    let invalidEmailMessage = await pm.onSignUpPage.getInvalidEmailMessage()
    expect(invalidEmailMessage).toContain("This is a required field.")
})

/**
 * @testCase Sign Up with Empty Password Validation
 * STR:
 *  0. "Before" steps are stored in the pm fixture
 *  1. Click "Create an Account" button in the header
 *  2. Fill in registration data with an empty password and attempt to create an account
 *  3. Get the invalid password message from the sign-up page
 *  4. Verify that the invalid password message contains the expected text
 */

test("Sign Up with Empty Password Validation @signup", async ({ pm }) => {

    await pm.onMainPage.inHeader.clickCreateAccountBtn()
    await pm.onSignUpPage.fillDataAndCreateAnAccount(userData.EMPTY_PASS_USER)
    let invalidEmailMessage = await pm.onSignUpPage.getInvalidPasswordMessage()
    expect(invalidEmailMessage).toContain("This is a required field.")
})

/**
* @testCase Password Strength Validation During Registration
* STR:
*   0. "Before" steps are stored in the pm fixture
*   1. Click "Create an Account" button in the header
*   2. Get initial password strength meter value and verify it contains 'No Password'
*   3. Fill in registration data and create an account with a weak password
*   4. Get password strength meter value and verify it contains 'Weak'
*   5. Fill in registration data and create an account with a medium password
*   6. Get password strength meter value and verify it contains 'Medium'
*   7. Fill in registration data and create an account with a strong password
*   8. Get password strength meter value and verify it contains 'Strong'
*   9. Fill in registration data and create an account with a very strong password
*   10. Get password strength meter value and verify it contains 'Very Strong'
*/

test("Password Strength Validation During Registration @signup", async ({ pm }) => {

    await pm.onMainPage.inHeader.clickCreateAccountBtn()
    let passwordStrengthMeter = await pm.onSignUpPage.getPasswordStrengthMeter('No Password')
    expect(passwordStrengthMeter).toContain('No Password')

    await pm.onSignUpPage.fillDataAndCreateAnAccount(userData.WEAK_PASS_USER)
    passwordStrengthMeter = await pm.onSignUpPage.getPasswordStrengthMeter('Weak')
    expect(passwordStrengthMeter).toContain('Weak')

    await pm.onSignUpPage.fillDataAndCreateAnAccount(userData.MEDIUM_PASS_USER)
    passwordStrengthMeter = await pm.onSignUpPage.getPasswordStrengthMeter('Medium')
    expect(passwordStrengthMeter).toContain('Medium')

    await pm.onSignUpPage.fillDataAndCreateAnAccount(userData.STRONG_PASS_USER)
    passwordStrengthMeter = await pm.onSignUpPage.getPasswordStrengthMeter('Strong')
    expect(passwordStrengthMeter).toContain('Strong')

    await pm.onSignUpPage.fillDataAndCreateAnAccount(userData.VERY_STRONG_PASS_USER)
    passwordStrengthMeter = await pm.onSignUpPage.getPasswordStrengthMeter('Very Strong')
    expect(passwordStrengthMeter).toContain('Very Strong')
})
