import { test, expect } from "../fixtures/baseFixtures"

test.beforeEach(async ({ pm }) => {

    await pm.onMainPage().visitMainPage()
    await pm.onMainPage().inHeader.writeForUsLink.waitFor()
    await pm.onSignUpPage().clearCookies()

})

// test("Test the sorting options on the product listing page", async ({ pm }) => {

// })

// test("Test sorting products by price", async ({ pm }) => {

// })

// test("Test filtering products by category", async ({ pm }) => {

// })
