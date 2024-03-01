import { test, expect } from "../fixtures/baseFixtures"

/**
 * @testCase Verify Style Sorting Options Functionality on the Product Listing Page @listing
 * STR:
 *  0. "Before" steps are stored in the pm fixture.
 *  1. Navigate to the Men's Tops Jackets category.
 *  2. Apply the 'Hooded' style filter.
 *  3. Verify that the 'Style' filter option is not visible in the 'Now Shopping' section.
 */
test("Style Sorting Option on the Product Listing @listing @Ta81a9203", async ({ pm }) => {

    await pm.onMainPage.inUiMenu.selectMenuItem('Men' ,'Tops' , 'Jackets')
    await pm.onProductListingPage.inFilterSidebar.selectFilterOption('Style', 'Hooded')

    expect(await pm.onProductListingPage.inFilterSidebar.isFilterOptVisibleInNowShopping('Style')).toBeFalsy()
})

/**
 * @testCase Verify Size Sorting Options Functionality on the Product Listing Page @listing
 * STR:
 *  0. "Before" steps are stored in the pm fixture.
 *  1. Select 'Men' > 'Bottoms' > 'Pants from the main menu.
 *  2. Choose size '33' from the filter sidebar.
 *  3. Verify that products with size '33' are displayed in the product grid.
 *  4. Verify that the 'Size' filter option is not visible in the current shopping state.
 */
test("Size Sorting Option on the Product Listing @listing @Tf7f2a133", async ({ pm }) => {

    await pm.onMainPage.inUiMenu.selectMenuItem('Men', 'Bottoms', 'Pants')

    await pm.onProductListingPage.inFilterSidebar.selectFilterOption('Size', '33')
    expect(await pm.onProductListingPage.inProductList.getAriaCheckedLabels('33')).not.toContain('false')
    expect(await pm.onProductListingPage.inFilterSidebar.isFilterOptVisibleInNowShopping('Size')).toBeFalsy()
})

/**
 * @testCase Verify Price Sorting Options Functionality on the Product Listing Page @listing
 * STR:
 *  0. "Before" steps are stored in the pm fixture.
 *  1. Select 'Gear' > 'Bags' from the main menu.
 *  2. Choose the price range '$40.00 - $49.99' from the filter sidebar.
 *  3. Retrieve the prices of all products listed on the page.
 *  4. Verify that the 'Price' filter option is not visible in the current shopping state.
 *  5. Verify that all product prices fall within the selected price range.
 */
test("Price Sorting Option on the Product Listing @listing @T2c0ad8e0", async ({ pm }) => {

    await pm.onMainPage.inUiMenu.selectMenuItem('Gear', 'Bags')

    await pm.onProductListingPage.inFilterSidebar.selectFilterOption('Price', '$40.00 - $49.99')
    let allProductsPrices = await pm.onProductListingPage.inProductList.getProductPrice('all')

    expect(await pm.onProductListingPage.inFilterSidebar.isFilterOptVisibleInNowShopping('Price')).toBeFalsy()
    expect(allProductsPrices.every(price => price >= 40 && price <= 49.99)).toBeTruthy()
})

/**
 * @testCase Verify Color Sorting Option Functionality on the Product Listing Page @listing
 * STR:
 *  0. "Before" steps are stored in the pm fixture.
 *  1. Select 'Men' > 'Tops' from the main menu.
 *  2. Choose the color option 'Orange' from the filter sidebar.
 *  3. Verify that the 'Color' filter option is not visible in the current shopping state.
 *  4. Verify that all products displayed have the color 'Orange'.
 */
test("Color sorting Option on the Product Listing @listing @T1780d5b7", async ({ pm }) => {

    await pm.onMainPage.inUiMenu.selectMenuItem('Men', 'Tops')

    await pm.onProductListingPage.inFilterSidebar.selectFilterOption('Color', 'Orange')

    expect(await pm.onProductListingPage.inFilterSidebar.isFilterOptVisibleInNowShopping('Color')).toBeFalsy()
    expect(await pm.onProductListingPage.inProductList.getAriaCheckedLabels('Orange')).not.toContain('false')
})

/**
 * @testCase Verify Material Sorting Option Functionality on the Product Listing Page @listing
 * STR:
 *  0. "Before" steps are stored in the pm fixture.
 *  1. Select 'Women' > 'Tops' from the main menu.
 *  2. Store the product list before applying any filters.
 *  3. Choose the material option 'Nylon' from the filter sidebar.
 *  4. Store the product list after applying the material filter.
 *  5. Verify that the 'Material' filter option is not visible in the current shopping state.
 *  6. Verify that the product list after applying the material filter is different from the initial list.
 */
test("Material Sorting Option on the Product Listing @listing @T3793221f", async ({ pm }) => {

    await pm.onMainPage.inUiMenu.selectMenuItem('Women', 'Tops')

    let sortBeforeFilter = await pm.onProductListingPage.inProductList.getProductName('all')
    await pm.onProductListingPage.inFilterSidebar.selectFilterOption('Material', 'Nylon')
    let sortAfterFilter = await pm.onProductListingPage.inProductList.getProductName('all')

    expect(await pm.onProductListingPage.inFilterSidebar.isFilterOptVisibleInNowShopping('Material')).toBeFalsy()
    expect(sortBeforeFilter).not.toContain(sortAfterFilter)
})

/**
 * @testCase Verify New Sorting Option Functionality on the Product Listing Page @listing
 * STR:
 *  0. "Before" steps are stored in the pm fixture.
 *  1. Select 'Men' > 'Bottoms' from the main menu.
 *  2. Store the product list before applying any filters.
 *  3. Choose the 'New' option from the filter sidebar.
 *  4. Store the product list after applying the 'New' filter.
 *  5. Verify that the 'New' filter option is not visible in the current shopping state.
 *  6. Verify that the product list after applying the 'New' filter is different from the initial list.
 */
test("New Sorting Option on the Product Listing @listing @T079154fb", async ({ pm }) => {

    await pm.onMainPage.inUiMenu.selectMenuItem('Men', 'Bottoms')

    let sortBeforeFilter = await pm.onProductListingPage.inProductList.getProductName('all')
    await pm.onProductListingPage.inFilterSidebar.selectFilterOption('New', 'Yes')
    let sortAfterFilter = await pm.onProductListingPage.inProductList.getProductName('all')

    expect(await pm.onProductListingPage.inFilterSidebar.isFilterOptVisibleInNowShopping('New')).toBeFalsy()
    expect(sortBeforeFilter).not.toContain(sortAfterFilter)
})

/**
 * @testCase Verify Sale Sorting Option Functionality on the Product Listing Page @listing
 * STR:
 *  0. "Before" steps are stored in the pm fixture.
 *  1. Select 'Women' > 'Tops' > 'Hoodies & Sweatshirts' from the main menu.
 *  2. Store the product list before applying any filters.
 *  3. Choose the 'Sale' option from the filter sidebar.
 *  4. Store the product list after applying the 'Sale' filter.
 *  5. Verify that the 'Sale' filter option is not visible in the current shopping state.
 *  6. Verify that the product list after applying the 'Sale' filter is different from the initial list.
 */
test("Sale Sorting Option on the Product Listing @listing @T2b505524", async ({ pm }) => {

    await pm.onMainPage.inUiMenu.selectMenuItem('Women', 'Tops', 'Hoodies & Sweatshirts')

    let sortBeforeFilter = await pm.onProductListingPage.inProductList.getProductName('all')
    await pm.onProductListingPage.inFilterSidebar.selectFilterOption('Sale', 'No')
    let sortAfterFilter = await pm.onProductListingPage.inProductList.getProductName('all')

    expect(await pm.onProductListingPage.inFilterSidebar.isFilterOptVisibleInNowShopping('Sale')).toBeFalsy()
    expect(sortBeforeFilter).not.toContain(sortAfterFilter)
})

/**
 * @testCase Verify Climat Style Sorting Option Functionality on the Product Listing Page @listing
 * STR:
 *  0. "Before" steps are stored in the pm fixture.
 *  1. Select 'Gear' > 'Fitness Equipment' from the main menu.
 *  2. Store the product list before applying any filters.
 *  3. Choose the 'New' option from the filter sidebar.
 *  4. Store the product list after applying the 'New' filter.
 *  5. Verify that the 'New' filter option is not visible in the current shopping state.
 *  6. Verify that the product list after applying the 'New' filter is different from the initial list.
 */
test("Climat Style Sorting on the Product Listing @listing @Tdef525d7", async ({ pm }) => {

    await pm.onMainPage.inUiMenu.selectMenuItem('Gear', 'Fitness Equipment')

    let sortBeforeFilter = await pm.onProductListingPage.inProductList.getProductName('all')
    await pm.onProductListingPage.inFilterSidebar.selectFilterOption('New', 'Yes')
    let sortAfterFilter = await pm.onProductListingPage.inProductList.getProductName('all')

    expect(await pm.onProductListingPage.inFilterSidebar.shoppingOption('New').isVisible()).toBeFalsy()
    expect(sortBeforeFilter).not.toContain(sortAfterFilter)
})

/**
 * @testCase Verify Sorting Products by Price Functionality on the Product Listing Page @listing
 * STR:
 *  0. "Before" steps are stored in the pm fixture.
 *  1. Select 'Men' > 'Tops' > 'Tees' from the main menu.
 *  2. Store the product prices before sorting.
 *  3. Sort the products by price.
 *  4. Store the product prices after sorting.
 *  5. Verify that the product prices after sorting are not the same as before sorting.
 *  6. Verify that the product prices after sorting are in ascending order.
 */
test("Sorting Products by Price @listing @Tdeeb361b", async ({ pm }) => {

    await pm.onMainPage.inUiMenu.selectMenuItem('Men', 'Tops', 'Tees')

    let sortBeforeFilter = await pm.onProductListingPage.inProductList.getProductPrice('all')
    await pm.onProductListingPage.sortProductBy('Price')
    let sortAfterFilter = await pm.onProductListingPage.inProductList.getProductPrice('all')

    expect(sortBeforeFilter).not.toEqual(sortAfterFilter)
    sortBeforeFilter.sort((a, b) => a - b);
    expect(sortBeforeFilter).toEqual(sortAfterFilter)
})

/**
 * @testCase Verify Sorting Products by Name Functionality on the Product Listing Page @listing
 * STR:
 *  0. "Before" steps are stored in the pm fixture.
 *  1. Select 'Men' > 'Tops' > 'Tees' from the main menu.
 *  2. Store the product names before sorting.
 *  3. Sort the products by name.
 *  4. Store the product names after sorting.
 *  5. Verify that the product names after sorting are not the same as before sorting.
 *  6. Verify that the product names after sorting are in alphabetical order.
 */
test("Sorting Products by Name @listing @T876dd079", async ({ pm }) => {

    await pm.onMainPage.inUiMenu.selectMenuItem('Men', 'Tops', 'Tees')

    let sortBeforeFilter = await pm.onProductListingPage.inProductList.getProductName('all')
    await pm.onProductListingPage.sortProductBy('Product Name')
    let sortAfterFilter = await pm.onProductListingPage.inProductList.getProductName('all')

    expect(sortBeforeFilter).not.toEqual(sortAfterFilter)
    sortBeforeFilter.sort()
    expect(sortBeforeFilter).toEqual(sortAfterFilter)
})

