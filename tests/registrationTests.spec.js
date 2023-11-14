import { test } from "@playwright/test"
import { expect } from "@playwright/test";
import { MainPage } from "../page-objects/MainPage"
import { CheckoutPage } from "../page-objects/CheckoutPage"
import { SinghUpPage } from "../page-objects/SinghUpPage"
import { MagentoTestUserData } from "../data/signInData"

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

    const sighUpPage = new SinghUpPage(page)

    await sighUpPage.visitSignUpPage()
    await page.context().clearCookies()
    await page.reload()
    let result = await sighUpPage.createNewCustomer(sighUpPage.getUniqueEmailPass('email'), sighUpPage.getUniqueEmailPass('pass'))

    expect(result).toContain("Thank you for registering")
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

    const sighUpPage = new SinghUpPage(page)

    await sighUpPage.visitSignUpPage()
    await page.context().clearCookies()
    await page.reload()
    let result = await sighUpPage.createAnExistingUser(MagentoTestUserData)

    expect(result).toContain("There is already an account with this email address")
})



