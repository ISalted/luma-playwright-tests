import { test as baseFixture} from '@playwright/test';
import { PageManager } from '../page-objects/helpers/pageManager'

export const expect = baseFixture.expect
export const test = baseFixture.extend<{ pm: PageManager }>({
    pm: async ({ page }, use) => {
        const pm = new PageManager(page);

        // await page.routeFromHAR('cache/cache.har', {
        //     notFound: 'fallback',
        // });

        await pm.onMainPage.visitMainPage()
        await pm.onMainPage.inHeader.writeForUsBtn.waitFor()
        await pm.onMainPage.clearCookies()
        await pm.onMainPage.inHeader.writeForUsBtn.waitFor({state: 'visible'})

        await use(pm);
    }
})
