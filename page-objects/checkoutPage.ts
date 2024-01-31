import { Locator, expect } from "@playwright/test";
import { HelperBase } from "./helpers/helperBase"

export class CheckoutPage extends HelperBase {
    readonly authorizationButton: Locator;
    readonly loginFill: Locator;
    readonly passFill: Locator;
    readonly LogInButton: Locator;
    readonly checkOutText: Locator;
    readonly loader: Locator;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly companyField: Locator;
    readonly addressField: Locator;
    readonly cityField: Locator;
    readonly zipField: Locator;
    readonly countryField: Locator;
    readonly stateField: Locator;
    readonly shippingMethodsButton: Locator;
    readonly phoneField: Locator;
    readonly nextButton: Locator;
    readonly paymentMethodTitle: Locator;
    readonly allShippingInformationLocator: Locator;
    readonly placeOrderButton: Locator;
    readonly orderThankYouNotification: Locator;
    readonly shippingAdressList: Locator;
    constructor(page) {
        super(page)

        this.loginFill = page.getByRole('textbox', { name: 'Email Address *' })
        this.passFill = page.getByRole('textbox', { name: 'Password' })
        this.LogInButton = page.getByRole('button', { name: 'Login' })
        this.checkOutText = page.getByText('You already have an account with us')


        this.loader = page.locator('.loader', { hasText: "Please wait..." })
        this.firstNameField = page.getByLabel('First Name')
        this.lastNameField = page.getByLabel('Last Name')
        this.companyField = page.getByLabel('Company')
        this.addressField = page.getByLabel('Street Address: Line 1')
        this.cityField = page.getByLabel('City')
        this.zipField = page.getByLabel('Zip/Postal Code')
        this.countryField = page.getByLabel('Country')
        this.stateField = page.locator('//*[@name="region_id"]')
        this.shippingMethodsButton = page.getByLabel('Table Rate')
        this.phoneField = page.getByLabel('Phone Number')
        this.nextButton = page.getByRole('button', { name: 'Next' })
        this.paymentMethodTitle = page.locator('.step-title', { hasText: 'Payment Method' })
        this.allShippingInformationLocator = page.locator('//*[@id="checkout-step-shipping"]//*[contains(@class, "input-text") or @class="select"]')

        this.placeOrderButton = page.getByRole('button', { name: 'Place Order' })
        this.orderThankYouNotification = page.locator('.page-title', { hasText: 'Thank you' })
        this.shippingAdressList = page.locator('//*[@class="shipping-address-item selected-item"]')
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
        await this.LogInButton.click()
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



