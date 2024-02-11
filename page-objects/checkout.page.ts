import { Locator, expect } from "@playwright/test";
import { BasePage } from "./helpers/basePage"

export class CheckoutPage extends BasePage {
    readonly loginFill = this.page.getByRole('textbox', { name: 'Email Address *' })
    readonly passFill = this.page.getByRole('textbox', { name: 'Password' })
    readonly logInButton = this.page.getByRole('button', { name: 'Login' })
    readonly checkOutText = this.page.getByText('You already have an account with us')

    readonly loader = this.page.locator('.loader', { hasText: "Please wait..." })
    readonly firstNameField = this.page.getByLabel('First Name')
    readonly lastNameField = this.page.getByLabel('Last Name')
    readonly companyField = this.page.getByLabel('Company')
    readonly addressField = this.page.getByLabel('Street Address: Line 1')
    readonly cityField = this.page.getByLabel('City')
    readonly zipField = this.page.getByLabel('Zip/Postal Code')
    readonly countryField = this.page.getByLabel('Country')
    readonly stateField = this.page.locator('//*[@name="region_id"]')
    readonly shippingMethodsButton = this.page.getByLabel('Table Rate')
    readonly phoneField = this.page.getByLabel('Phone Number')
    readonly nextButton = this.page.getByRole('button', { name: 'Next' })
    readonly paymentMethodTitle = this.page.locator('.step-title', { hasText: 'Payment Method' })
    readonly allShippingInformationLocator = this.page.locator('//*[@id="checkout-step-shipping"]//*[contains(@class, "input-text") or @class="select"]')

    readonly placeOrderButton = this.page.getByRole('button', { name: 'Place Order' })
    readonly orderThankYouNotification = this.page.locator('.page-title', { hasText: 'Thank you' })
    readonly shippingAdressList = this.page.locator('//*[@class="shipping-address-item selected-item"]')

    constructor(page) {
        super(page)
    }

    visitCheckoutPage = async () => {
        await this.page.goto("/checkout/#shipping")
        await this.page.waitForURL(/\/checkout/gm, { timeout: 3000 })
    }

    loginFromCheckout = async (signInData, clearCookie?) => {
        if (clearCookie == 'Clear Coockie'){
            await this.clearCookies()
        }
        await this.loginFill.waitFor()
        await this.loginFill.fill(signInData.email)
        await this.passFill.waitFor()
        await this.passFill.fill(signInData.pass)
        await this.firstNameField.waitFor()
        await this.logInButton.click()
        try {
            await this.checkOutText.waitFor({ state: 'hidden' })
        } catch (error) {
            await this.page.reload();
            await this.checkOutText.waitFor({ state: 'hidden' })
        }

    }

    getShippingAddressInformation = async () => {
        return await this.shippingAdressList.textContent()
    }

    fillShippingDetails = async (shippingDetails) =>{
        await this.loader.waitFor({ state: 'hidden' })
        await this.firstNameField.fill(shippingDetails.firstName)
        await this.lastNameField.fill(shippingDetails.lastName)
        await this.companyField.fill(shippingDetails.company)
        await this.addressField.fill(shippingDetails.address)
        await this.cityField.fill(shippingDetails.city)
        await this.zipField.fill(shippingDetails.zip)
        await this.countryField.selectOption(shippingDetails.country)
        await this.stateField.selectOption(shippingDetails.state)
        await this.shippingMethodsButton.click()
        await this.phoneField.type(shippingDetails.phone)
        await this.loader.waitFor({ state: 'hidden' })
        await this.nextButton.click()
        await this.paymentMethodTitle.waitFor({ state: 'visible' })
        await this.visitCheckoutPage()

        const selectCount = await this.allShippingInformationLocator.count()
        const valuesArray: string[] = [];

        for (let i = 0; i < selectCount; i++) {
            const stringValue:string = await this.allShippingInformationLocator.nth(i).inputValue();
            if (stringValue !== '') {
                valuesArray.push(stringValue);
            }
        }
        expect(Object.values(shippingDetails)).toEqual(valuesArray)
    }
    placeOrder = async () => {
        await this.nextButton.click()
        await this.loader.waitFor({ state: 'hidden' })
        await this.placeOrderButton.waitFor()
        await this.placeOrderButton.click()
        await this.orderThankYouNotification.waitFor()
        return await this.orderThankYouNotification.innerText()
    }
}



