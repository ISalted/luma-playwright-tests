import { test, expect } from "@playwright/test"
import { PageManager } from "../page-objects/helpers/pageManager";

import { MagentoTestUserData } from "../data/signInData"
import { WrongUserData } from "../data/signInData"

test.beforeEach(async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onMainPage().visitMainePage()
    await pm.onMainPage().clearCookies()
})

test("LogIn test", async ({ page }) => {
    /*
    Check Sign In
    STR:
    1. Open host URL https://magento.softwaretestingboard.com
    2. Clear coookies
    3. Click “Sign in” button
    4. Log in as a registered user
    5. Check the welcome text
    */
    const pm = new PageManager(page)

    let result = await pm.onSignInPage().login(MagentoTestUserData, 'Don`t Clear Coockie')
    expect(result).toContain("Welcome")
})

test("LogIn with wrong data Test", async ({ page }) => {
    /*
    Check Sign In
    STR:
    1. Open host URL https://magento.softwaretestingboard.com
    2. Clear coookies
    3. Click “Sign in” button
    4. Log in as a user with wrong email and pass
    5. Check allert message
    */
    const pm = new PageManager(page)

    let result = await pm.onSignInPage().loginWrongData(WrongUserData)
    expect(result).toContain("The account sign-in was incorrect")
})

test("LogIn from checkOut page Test", async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onMainPage().addToBasket("1", "S", "Blue")
    await page.pause()
    await pm.onCheckoutPage().visitCheckoutPage()
    const result = await pm.onCheckoutPage().login(MagentoTestUserData)
    expect(result).toContain("Pennsylvania Avenue NW")
})
