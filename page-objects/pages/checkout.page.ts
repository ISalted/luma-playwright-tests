import { step } from "../helpers/step";
import { Components } from "../page-components/components";

export class CheckoutPage extends Components {
    public pagePath = '/checkout/cart'

    private loginFill = this.page.getByRole('textbox', { name: 'Email Address *' })
    private passFill = this.page.getByRole('textbox', { name: 'Password' })
    private logInButton = this.page.getByRole('button', { name: 'Login' })
    private checkOutText = this.page.getByText('You already have an account with us')

    private loader = this.page.locator('.loader', { hasText: "Please wait..." })
    private firstNameField = this.page.getByLabel('First Name')
    private lastNameField = this.page.getByLabel('Last Name')
    private companyField = this.page.getByLabel('Company')
    private addressField = this.page.getByLabel('Street Address: Line 1')
    private cityField = this.page.getByLabel('City')
    private zipField = this.page.getByLabel('Zip/Postal Code')
    private countryField = this.page.getByLabel('Country')
    private stateField = this.page.locator('//*[@name="region_id"]')
    private shippingMethodsButton = this.page.getByLabel('Table Rate')
    private phoneField = this.page.getByLabel('Phone Number')
    private nextButton = this.page.getByRole('button', { name: 'Next' })
    private paymentMethodTitle = this.page.locator('.step-title', { hasText: 'Payment Method' })
    private allShippingInformationLocator = this.page.locator('//*[@id="checkout-step-shipping"]//*[contains(@class, "input-text") or @class="select"]')

    private placeOrderButton = this.page.getByRole('button', { name: 'Place Order' })
    private orderThankYouNotification = this.page.locator('.page-title', { hasText: 'Thank you' })
    private shippingAdressList = this.page.locator('//*[@class="shipping-address-item selected-item"]')

    @step()
    async visitCheckoutPage () {
        await this.page.goto("/checkout/#shipping")
        await this.page.waitForURL(/\/checkout/gm, { timeout: 3000 })
    }

    async loginFromCheckout (signInData, clearCookie?) {
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

    @step()
    async getShippingAddressInformation () {
        return await this.shippingAdressList.textContent()
    }

    @step()
    async fillShippingDetails (shippingDetails) {
        await this.loader.waitFor({ state: 'hidden' })
        await this.firstNameField.fill(shippingDetails.firstName)
        await this.lastNameField.fill(shippingDetails.lastName)
        await this.companyField.fill(shippingDetails.company)
        await this.addressField.fill(`C${shippingDetails.address}`)
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
    }

    @step()
    async placeOrder () {
        await this.nextButton.click()
        await this.loader.waitFor({ state: 'hidden' })
        await this.placeOrderButton.waitFor()
        await this.placeOrderButton.click()
        await this.orderThankYouNotification.waitFor()
        return await this.orderThankYouNotification.innerText()
    }
}



