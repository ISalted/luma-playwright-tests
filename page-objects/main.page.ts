import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "./helpers/basePage"

export class MainPage extends BasePage {
    readonly alertMessage = this.page.getByRole('alert').filter({ hasText: 'You added ' })

    constructor(page: Page) {
        super(page)
    }

    visitMainPage = async () => {
        await this.page.goto('/')
    }

    addProductToTheBasketFromMainPage = async (inputLiNumb, inputSize, inputCollor) => {
        await this.page.waitForLoadState('networkidle');

        let counter = await this.inHeader.getBasketCounter();
        let producTitleName = await this.inProductGrid.addToBasketFromGridAndReturnHisName(inputLiNumb, inputSize, inputCollor)
        counter++;
        await this.inHeader.getBasketCounter(counter)
        return producTitleName
    }
}
