import { test, expect } from "../fixtures/baseFixtures"


test("Style sorting Options on the Product Listing", async ({ pm }) => {

    await pm.onMainPage.inUiMenu.selectMenuItem('Men' ,'Tops' , 'Jackets')
    await pm.onProductListingPage.inFilterSidebar.selectFilterOption('Style', 'Hooded')

    expect(await pm.onProductListingPage.inFilterSidebar.isFilterOptVisibleInNowShopping('Style')).toBeFalsy()

})

test("Size sorting Options on the Product Listing", async ({ pm }) => {

    await pm.onMainPage.inUiMenu.selectMenuItem('Men', 'Bottoms', 'Pants')

    await pm.onProductListingPage.inFilterSidebar.selectFilterOption('Size', '33')
    expect(await pm.onProductListingPage.inProductGrid.getAriaCheckedLabels('33')).not.toContain('false')
    expect(await pm.onProductListingPage.inFilterSidebar.isFilterOptVisibleInNowShopping('Size')).toBeFalsy()

})

test("Price sorting Options on the Product Listing", async ({ pm }) => {

    await pm.onMainPage.inUiMenu.selectMenuItem('Gear', 'Bags')

    await pm.onProductListingPage.inFilterSidebar.selectFilterOption('Price', '$40.00 - $49.99')
    let allProductsPrices = await pm.onProductListingPage.inProductGrid.getProductPrice('all')

    expect(await pm.onProductListingPage.inFilterSidebar.isFilterOptVisibleInNowShopping('Price')).toBeFalsy()
    expect(allProductsPrices.every(price => price >= 40 && price <= 49.99)).toBeTruthy()

})

test("Color sorting Options on the Product Listing", async ({ pm }) => {

    await pm.onMainPage.inUiMenu.selectMenuItem('Men', 'Tops')

    await pm.onProductListingPage.inFilterSidebar.selectFilterOption('Color', 'Orange')

    expect(await pm.onProductListingPage.inFilterSidebar.isFilterOptVisibleInNowShopping('Color')).toBeFalsy()
    expect(await pm.onProductListingPage.inProductGrid.getAriaCheckedLabels('Orange')).not.toContain('false')

})

test("Material sorting Options on the Product Listing", async ({ pm }) => {

    await pm.onMainPage.inUiMenu.selectMenuItem('Women', 'Tops')

    let sortBeforeFilter = await pm.onProductListingPage.inProductGrid.getProductName('all')
    await pm.onProductListingPage.inFilterSidebar.selectFilterOption('Material', 'Nylon')
    let sortAfterFilter = await pm.onProductListingPage.inProductGrid.getProductName('all')

    expect(await pm.onProductListingPage.inFilterSidebar.isFilterOptVisibleInNowShopping('Material')).toBeFalsy()
    expect(sortBeforeFilter).not.toContain(sortAfterFilter)

})

test("New sorting Options on the Product Listing", async ({ pm }) => {

    await pm.onMainPage.inUiMenu.selectMenuItem('Men', 'Bottoms')

    let sortBeforeFilter = await pm.onProductListingPage.inProductGrid.getProductName('all')
    await pm.onProductListingPage.inFilterSidebar.selectFilterOption('New', 'Yes')
    let sortAfterFilter = await pm.onProductListingPage.inProductGrid.getProductName('all')

    expect(await pm.onProductListingPage.inFilterSidebar.isFilterOptVisibleInNowShopping('New')).toBeFalsy()
    expect(sortBeforeFilter).not.toContain(sortAfterFilter)

})

test("Sale sorting Options on the Product Listing", async ({ pm }) => {

    await pm.onMainPage.inUiMenu.selectMenuItem('Women', 'Tops', 'Hoodies & Sweatshirts')

    let sortBeforeFilter = await pm.onProductListingPage.inProductGrid.getProductName('all')
    await pm.onProductListingPage.inFilterSidebar.selectFilterOption('Sale', 'No')
    let sortAfterFilter = await pm.onProductListingPage.inProductGrid.getProductName('all')

    expect(await pm.onProductListingPage.inFilterSidebar.isFilterOptVisibleInNowShopping('Sale')).toBeFalsy()
    expect(sortBeforeFilter).not.toContain(sortAfterFilter)

})

test("Climat Style sorting on the Product Listing", async ({ pm }) => {

    await pm.onMainPage.inUiMenu.selectMenuItem('Gear', 'Fitness Equipment')

    let sortBeforeFilter = await pm.onProductListingPage.inProductGrid.getProductName('all')
    await pm.onProductListingPage.inFilterSidebar.selectFilterOption('New', 'Yes')
    let sortAfterFilter = await pm.onProductListingPage.inProductGrid.getProductName('all')

    expect(await pm.onProductListingPage.inFilterSidebar.shoppingOption('New').isVisible()).toBeFalsy()
    expect(sortBeforeFilter).not.toContain(sortAfterFilter)

})


test("Test sorting products by price", async ({ pm }) => {

    await pm.onMainPage.inUiMenu.selectMenuItem('Men', 'Tops', 'Tees')

    let sortBeforeFilter = await pm.onProductListingPage.inProductGrid.getProductPrice('all')
    await pm.onProductListingPage.sortProductBy('Price')
    let sortAfterFilter = await pm.onProductListingPage.inProductGrid.getProductPrice('all')

    expect(sortBeforeFilter).not.toEqual(sortAfterFilter)
    sortBeforeFilter.sort((a, b) => a - b);
    expect(sortBeforeFilter).toEqual(sortAfterFilter)



})

// test("Test filtering products by category", async ({ pm }) =>
// })
