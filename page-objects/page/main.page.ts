import { step } from "../helpers/step";
import { Base } from "../helpers/base"

export class MainPage extends Base {
    public pagePath = '/'

    private alertMessage = this.page.getByRole('alert').filter({ hasText: 'You added ' })

    @step()
    async visitMainPage () {
        await this.page.goto(this.pagePath)
    }

    @step()
    async addProductToTheBasketFromMainPage (inputLiNumb, inputSize, inputCollor) {
        await this.page.waitForLoadState('networkidle');

        let counter = await this.inHeader.getBasketCounter();
        let producTitleName = await this.inProductGrid.addToBasketFromGridAndReturnHisName(inputLiNumb, inputSize, inputCollor)
        counter++;
        await this.inHeader.getBasketCounter(counter)
        return producTitleName
    }
}
