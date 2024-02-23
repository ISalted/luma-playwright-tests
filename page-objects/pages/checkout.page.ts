import { step } from "../helpers/step";
import { Components } from "../page-components/components";

export class CheckoutPage extends Components {
    public pagePath = '/checkout/cart'

    private loginFill = this.page.getByRole('textbox', { name: 'Email Address *' })
    private passFill = this.page.getByRole('textbox', { name: 'Password' })
    private logInBtn = this.page.getByRole('button', { name: 'Login' })
    private checkOutText = this.page.getByText('You already have an account with us')

    private loader = this.page.locator('.loader', { hasText: "Please wait..." })
    private firstNameFld = this.page.getByRole('textbox', { name: 'First Name' })
    private lastNameFld = this.page.getByRole('textbox', { name: 'Last Name' })
    private companyFld = this.page.getByRole('textbox', { name: 'Company' })
    private addressFld = this.page.getByRole('textbox', { name: 'Street Address: Line 1' })
    private cityFld = this.page.getByRole('textbox', { name: 'City' })
    private zipFld = this.page.getByRole('textbox', { name: 'Zip/Postal Code' })
    private phoneFld = this.page.getByRole('textbox', { name: 'Phone Number' })
    private countryFld = this.page.getByRole('combobox', { name: 'Country' })
    private stateFld = this.page.getByRole('combobox', { name: 'State/Province' })
    private shippingMethodsBtn = this.page.getByRole('radio', { name: 'Table Rate' })
    private nextBtn = this.page.getByRole('button', { name: 'Next' })
    private paymentMethodTitle = this.page.locator('.step-title', { hasText: 'Payment Method' })
    private textboxesOfBillingAddress = this.page.locator('//*[@id="checkout-step-shipping"]//*[contains(@class, "input-text") or @class="select"]')
    private billingAddressDetails = this.page.locator(".billing-address-details")

    private placeOrderBtn = this.page.getByRole('button', { name: 'Place Order' })
    private orderThankYouNotification = this.page.locator('.page-title', { hasText: 'Thank you' })
    private shippingAdressList = this.page.locator('//*[@class="shipping-address-item selected-item"]')

    @step()
    async visitCheckoutPage () {
        await this.page.goto("/checkout/#shipping")
        await this.page.waitForURL(/\/checkout/gm, { timeout: 3000 })
    }

    async signInFromCheckout (signInData, clearCookie?) {
        if (clearCookie == 'Clear Coockie'){
            await this.clearCookies()
        }
        await this.loginFill.waitFor()
        await this.loginFill.fill(signInData.email)
        await this.passFill.waitFor()
        await this.passFill.fill(signInData.pass)
        await this.firstNameFld.waitFor()
        await this.logInBtn.click()
        try {
            await this.checkOutText.waitFor({ state: 'hidden' })
        } catch (error) {
            await this.page.reload();
            await this.checkOutText.waitFor({ state: 'hidden' })
        }

    }

    @step()
    async getShippingAddressInformation () {
        return await this.shippingAdressList.textContent()
    }

    @step()
    async fillShippingDetailsAndRerurnItsData (shippingDetails) {
        await this.loader.waitFor({ state: 'hidden' })
        await this.firstNameFld.fill(shippingDetails.firstName)
        await this.lastNameFld.fill(shippingDetails.lastName)
        await this.companyFld.fill(shippingDetails.company)
        await this.addressFld.fill(shippingDetails.address)
        // await this.addressFld.fill(`C${shippingDetails.address}`)
        await this.cityFld.fill(shippingDetails.city)
        await this.zipFld.fill(shippingDetails.zip)
        await this.countryFld.selectOption(shippingDetails.country)
        await this.stateFld.selectOption(shippingDetails.state)
        await this.shippingMethodsBtn.click()
        await this.phoneFld.fill(shippingDetails.phone)
        await this.loader.waitFor({ state: 'hidden' })
        await this.nextBtn.click()
        await this.paymentMethodTitle.waitFor({ state: 'visible' })
        return await this.billingAddressDetails.textContent()
    }

    async getValuesOfShippingInformationDetails() {
        const selectCount = await this.textboxesOfBillingAddress.count()
        const valuesArray: string[] = [];

        for (let i = 0; i < selectCount; i++) {
            const stringValue: string = await this.textboxesOfBillingAddress.nth(i).inputValue({timeout:1000});
            if (stringValue !== '') {
                valuesArray.push(stringValue);
            }
        }
        return valuesArray
    }

    @step()
    async placeOrder () {
        await this.loader.waitFor({ state: 'hidden' })
        await this.placeOrderBtn.waitFor()
        await this.placeOrderBtn.click()
        await this.orderThankYouNotification.waitFor()
        return await this.orderThankYouNotification.innerText()
    }
}



