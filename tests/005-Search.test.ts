import { test, expect } from "../fixtures/baseFixtures"


test("Searching with Valid Keywords @search @T6f2ff5e5", async ({ pm }) => {
    await pm.onMainPage.inHeader.searchEntireStore('Hoodie', 'autocomplete')
    const searchedProductNames = await pm.onProductListingPage.inProductList.getProductName('all')

    await expect(searchedProductNames).toEqual(expect.arrayContaining([expect.stringContaining('Hoodie')]));
})

test("Searching with Special Characters @search @T0391dda4", async ({ pm }) => {
    await pm.page.pause()
    await pm.onMainPage.inHeader.searchEntireStore('H00dies!', 'all')
    const noticeMessage = await pm.onProductListingPage.getNoticeMessage()
    expect(noticeMessage).toContain('Your search returned no results.')

})


