import { test, expect } from "../fixtures/baseFixtures"

import { ExistingUsersData, UserDataWithWrongEmail, UserDataWithUniqueEmailAndPass, UserDataWithWrongPass } from "../data/userData"


test("Sign Up new user Test", async ({ pm }) => {
    /*
    Check Sign In
    STR:
    1. Clear coookies
    2. Open host URL https://magento.softwaretestingboard.com/customer/account/create/
    3. Fill in all fields with valid data.
    4. Press the "Create an Account" button.
    5. Check success message
    */


    await pm.onMainPage().inHeader.createAnAccountButtonClick()
    await pm.onSignUpPage().fillDataAndCreateAnAccount(UserDataWithUniqueEmailAndPass)
    let successMessageFromMyAccountPage = await pm.onMyAccountPage().getSuccessfulMessageAfterRegistration()

    expect(successMessageFromMyAccountPage).toContain("Thank you for registering")
})

test("Sign Up existing user Test", async ({ pm }) => {
    /*
    Check Sign In
    STR:
    1. Clear coookies
    2. Open host URL https://magento.softwaretestingboard.com/customer/account/create/
    3. Fill in the fields with the data of a user who already exists.
    4. Press the "Create an Account" button.
    5. Check allert message
    */

    await pm.onMainPage().inHeader.createAnAccountButtonClick()
    await pm.onSignUpPage().fillDataAndCreateAnAccount(ExistingUsersData)
    let unsuccessfulMessageFromSignUpPage = await pm.onSignUpPage().getExistingAccountMessage()
    expect(unsuccessfulMessageFromSignUpPage).toContain("There is already an account with this email address")
})

test("Sign Up with an incorrect email", async ({ pm }) => {

    await pm.onMainPage().inHeader.createAnAccountButtonClick()
    await pm.onSignUpPage().fillDataAndCreateAnAccount(UserDataWithWrongEmail)
    let invalidEmailMessage = await pm.onSignUpPage().getInvalidEmailMessage()
    expect(invalidEmailMessage).toContain("Please enter a valid email address (Ex: johndoe@domain.com).")

})

test("Sign up with an incorrect password", async ({ pm }) => {

    await pm.onMainPage().inHeader.createAnAccountButtonClick()
    await pm.onSignUpPage().fillDataAndCreateAnAccount(UserDataWithWrongPass)
    let invalidEmailMessage = await pm.onSignUpPage().getInvalidPasswordMessage()
    expect(invalidEmailMessage).toContain("Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.")

})

test("Successful user registration with valid information", async ({ page }) => {
    var Fruit = (function () {
        var types = {};
        function Fruit() { };

        // count own properties in object
        function count(love) {
            return Object.keys(love).length;
        }

        var _static = {
            getFruit: function (type) {
                if (typeof types[type] == 'undefined') {
                    types[type] = new Fruit;
                }
                return types[type];
            },
            printCurrentTypes: function () {
                console.log('Number of instances made: ' + count(types));
                for (var type in types) {
                    console.log(type);
                }
            }
        };

        return _static;

    })();

    Fruit.getFruit('Apple');
    Fruit.printCurrentTypes();
})




// test("Verify password strength validation during registration", async ({ pm }) => {

// })





