import { test, expect } from "@playwright/test"
import { PageManager } from "../page-objects/helpers/pageManager";

test.beforeEach(async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onMainPage().visitMainPage()
    await pm.onMainPage().inHeader.writeForUsLink.waitFor()
    await pm.onSignUpPage().clearCookies()

})

// test("Verify that the search result page displays products", async ({ page }) => {
//     const pm = new PageManager(page)

// })

// test("Test searching with valid keywords", async ({ page }) => {
//     const pm = new PageManager(page)

// })

// test("Test searching with special characters in the query", async ({ page }) => {
//     const pm = new PageManager(page)

// })

// test("Test searching for out-of-stock products", async ({ page }) => {
//     const pm = new PageManager(page)

// })
