import { expect, test } from '@playwright/test';
import { exec } from 'child_process';

test.only('timeout', async ({ page }) => {
    /*  Global TimeOut - Time limit of the whole test run
        * We're changing this parameter in playwright.config.js, the variable 'Global Timeout'.

            Test TimeOut - Time limit for the single test
            * We're changing this parameter in playwright.config.js, the variable 'timeout'.
                Action TimeOut - time limit for the action command; Ex:click(), fill(), textContent(), etc
                * We're changing this parameter in playwright.config.js, the variable in object: "use"
                Navigation TimeOut - time limit for the action command; Ex: page.goto('/)
                * We're changing this parameter in playwright.config.js, the variable in object: "use"
                Expect TimeOut - time limit for "expect" locator asserions; Ex: expect(locator).toHaveText('HelloWorld)
                * We're changing this parameter in playwright.config.js, the variable in object: "expect"
    */

    // In playwright.config.js

    await page.goto(('http://uitestingplayground.com/ajax'))
    test.setTimeout(10000)
    test.slow() // increase will increase the default time out x3
    const successButton = page.locator('.bg-success')
    await page.getByRole('button', { name: 'Button Triggering AJAX Request' }).click()
    await successButton.click()

})

