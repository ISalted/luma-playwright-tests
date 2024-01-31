import { Page } from "@playwright/test"
import { HeaderElements } from "../persistentElements/headerElements"
import { UiMenuElements } from "../persistentElements/uiMenuElements"
import { ProductGrid } from "../persistentElements/productsgrid"
import { footerElements } from "../persistentElements/footerElements"

import { v4 as uuidv4 } from "uuid";


export abstract class HelperBase {
    constructor(protected page: Page) { }

    inHeader = new HeaderElements(this.page)
    inUiMenu = new UiMenuElements(this.page)
    inProductGrid = new ProductGrid(this.page)
    inFooter = new footerElements(this.page)

   async clearCookies(){
        await this.page.context().clearCookies()
        await this.page.reload()
    }
}

/*
Verify that the homepage loads successfully і усі інші сторінки
Navigation Menu
Banners and Product Carousel Navigation

Сортування та пошук продуктів:
Test the sorting options on the product listing page
Test sorting products by price
Test the advanced search feature with filters
Verify the accuracy of product recommendations on the homepage
Test searching with valid keywords
Verify that the search result page displays products
Verify that empty search fields provide a proper message
Test searching with special  characters in the query
Verify that advanced search filters work as expected
Test searching for out-of-stock products
Test search with a very long query string
Verify that the "Clear" button in search filters works
Verify that all product categories are listed
Test filtering products by category

Робота з кошиком і оформленням замовлення:
Verify that the "Add to Cart" button adds products to the shopping cart
Ensure that the "Remove" button in the shopping cart works
Test adding a product to the shopping cart.
Verify that the cart icon updates with the item count.
Test removing a product from the cart
Verify that the cart total is correctly calculated
Test updating the quantity of items in the cart
Test the "Continue Shopping" button in the cart
Verify that the "Proceed to Checkout" button works
Test cart persistence across user sessions
Check for a confirmation message after adding/removing items
Test cart functionality with both registered and guest users
Verify that the cart is emptied after the order is placed
Verify that users can add/edit shipping addresses
Test the ability to review and edit the order before placing it

Авторизація та реєстрація:
Check login with an incorrect username/email.
Test login with an incorrect password.
Test login with empty data.
Verify the "Forgot Password" link functionality
Verify the "LogOut" functionality
Verify successful user registration with valid information.
Test registration with missing required fields (e.g., email, password)
Verify password strength validation during registration.

Інші функціональності:
Check the "Contact Us" page for proper functionality
Ensure that the website footer links are functional
Pagination On Product Listing Page
Proceed to Checkout Button
*/
