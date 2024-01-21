import { test, expect } from "@playwright/test"
import { PageManager } from "../page-objects/helpers/pageManager";

test.beforeEach(async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onMainPage().visitMainPage()
    await pm.onSignUpPage().clearCookies()
})

// test("Test the sorting options on the product listing page", async ({ page }) => {
//     const pm = new PageManager(page)

// })

// test("Test sorting products by price", async ({ page }) => {
//     const pm = new PageManager(page)

// })

// test("Test filtering products by category", async ({ page }) => {
//     const pm = new PageManager(page)

// })
