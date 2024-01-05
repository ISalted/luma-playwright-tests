import { test, expect } from "@playwright/test"
import { PageManager } from "../page-objects/helpers/pageManager";

import { MagentoTestUserData } from "../data/signInData"

test.beforeEach(async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onMainPage().visitMainPage()
    await pm.onMainPage().clearCookies()
})

test("Create new user Test", async ({ page }) => {
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
    await pm.onSignUpPage().createNewCustomer(pm.onSignUpPage().getUniqueEmailPass('email'), pm.onSignUpPage().getUniqueEmailPass('pass'))
    let successMessageFromMyAccountPage = await pm.onMyAccountPage().getSuccessfulMessageAfterRegistration()

    expect(successMessageFromMyAccountPage).toContain("Thank you for registering")
})

test("Create an existing user Test", async ({ page }) => {
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
    await pm.onSignUpPage().createAnExistingUser(MagentoTestUserData)
    let unsuccessfulMessageFromSignUpPage = await pm.onSignUpPage().getUnsuccessfulMessageAfterRegistration()

    expect(unsuccessfulMessageFromSignUpPage).toContain("There is already an account with this email address")
})



