import { Locator, Page, expect } from "@playwright/test"
import { HelperBase } from "./helpers/helperBase"

export class MainPage extends HelperBase {
    readonly alertMessage: Locator;

    constructor(page: Page) {
        super(page)

        this.alertMessage = page.getByRole('alert').filter({ hasText: 'You added ' })
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
