import { expect } from "@playwright/test";

export class CheckoutPage {
    constructor(page) {
        this.page = page

        this.authorizationButton = page.locator('');
        this.loginFill = page.locator('(//*[@type="email"])[2]');
        this.passFill = page.locator('(//*[@type="password"])[2]');
        this.signInButton = page.locator('(//*[@type="submit"])[2]');
        this.checkOutText = page.getByText('You already have an account with us')


        this.loader = page.locator('(//*[@alt="Loading..."])[1]')
        this.firstNameField = page.locator('//*[@name="firstname"]')
        this.lastNameField = page.locator('//*[@name="lastname"]')
        this.companyField = page.locator('//*[@name="company"]')
        this.addressField = page.locator('//*[@name="street[0]"]')
        this.cityField = page.locator('//*[@name="city"]')
        this.zipField = page.locator('//*[@name="postcode"]')
        this.countryField = page.locator('//*[@name="country_id"]')
        this.stateField = page.locator('//*[@name="region_id"]')
        this.shippingMethodsButton = page.locator('(//*[@type="radio"])[1]')
        this.phoneField = page.locator('//*[@name="telephone"]')
        this.nextButton = page.locator('//*[@class="button action continue primary"]')
        this.paymentMethodTitle = page.getByText('Payment Method').nth(0)
        this.allShippingInformationLocator = page.locator('//*[@id="checkout-step-shipping"]//*[contains(@class, "input-text") or @class="select"]')

        this.placeOrderButton = page.locator('//*[@class="action primary checkout"]')
        this.orderThankYouNotification = page.locator('//*[contains(text(), "Thank you for your purchase!")]')
        this.shippingAdressList = page.locator('//*[@class="shipping-address-item selected-item"]')
    }

    visitCheckoutPage = async () => {
        await this.page.goto("/checkout/#shipping")
        await this.page.waitForURL(/\/checkout/gm, { timeout: 3000 })
    }

    login = async (signInData) => {
        await this.loginFill.waitFor()
        await this.loginFill.fill(signInData.email)
        await this.passFill.waitFor()
        await this.passFill.fill(signInData.pass)
        await this.firstNameField.waitFor()
        await this.signInButton.click()
        // await this.page.waitForSelector('(//*[@class="note])[2]', { state: 'hidden' });
        try {
            await expect(this.checkOutText).toBeHidden({ timeout: 10000});
        } catch (error) {
            await this.page.reload();
            await expect(this.checkOutText).toBeHidden({ timeout: 10000 });
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
        const valuesArray = [];

        for (let i = 0; i < selectCount; i++) {
            const value = await this.allShippingInformationLocator.nth(i).inputValue();
            if (value !== '') {
                valuesArray.push(value);
            }
        }
        expect(Object.values(shippingDetails)).toEqual(valuesArray)
    }
    placeOrder = async () => {
        await this.nextButton.click()

        await this.loader.waitFor({ state: 'hidden' })
        await this.placeOrderButton.waitFor({ timeout: 10000 })
        await this.placeOrderButton.click()
        await this.orderThankYouNotification.waitFor({ timeout: 10000 })
        return await this.orderThankYouNotification.innerText()
    }
}



