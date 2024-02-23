import { step } from "../helpers/step";
import { Components } from "../page-components/components";

export class MainPage extends Components {
    public pagePath = '/'

    private alertMse = this.page.getByRole('alert').filter({ hasText: 'You added ' })

    @step()
    async visitMainPage () {
        await this.page.goto(this.pagePath)
    }
}
