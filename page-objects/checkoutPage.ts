import { Locator, expect } from "@playwright/test";
import { HelperBase } from "./helpers/helperBase"

export class CheckoutPage extends HelperBase {
    public readonly authorizationButton: Locator;
    public readonly loginFill: Locator;
    public readonly passFill: Locator;
    public readonly LogInButton: Locator;
    public readonly checkOutText: Locator;
    public readonly loader: Locator;
    public readonly firstNameField: Locator;
    public readonly lastNameField: Locator;
    public readonly companyField: Locator;
    public readonly addressField: Locator;
    public readonly cityField: Locator;
    public readonly zipField: Locator;
    public readonly countryField: Locator;
    public readonly stateField: Locator;
    public readonly shippingMethodsButton: Locator;
    public readonly phoneField: Locator;
    public readonly nextButton: Locator;
    public readonly paymentMethodTitle: Locator;
    public readonly allShippingInformationLocator: Locator;
    public readonly placeOrderButton: Locator;
    public readonly orderThankYouNotification: Locator;
    public readonly shippingAdressList: Locator;
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

    login = async (signInData, clearCookie?) => {
        if (clearCookie == 'Clear Coockie'){
            await this.clearCookies()
        }
        await this.loginFill.waitFor()
        await this.loginFill.fill(signInData.email)
        await this.passFill.waitFor()
        await this.passFill.fill(signInData.pass)
        await this.firstNameField.waitFor()
        await this.LogInButton.click()
        // await this.page.waitForSelector('(//*[@class="note])[2]', { state: 'hidden' });
        try {
            await expect(this.checkOutText).toBeHidden({ timeout: 10000});
        } catch (error) {
            await this.page.reload();
            await expect(this.checkOutText).toBeHidden();
        }
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
        await expect(this.paymentMethodTitle).toBeVisible()
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



