import { Page } from "@playwright/test"
import { faker as oldFaker } from '@faker-js/faker'


export abstract class BasePage {
    // constructor(protected page: Page) { }
    page: Page
    constructor(page: Page) {
        this.page = page;
    }


    faker = oldFaker

    async clearCookies(){
        await this.page.context().clearCookies()
        await this.page.reload()
    }

    getRandomElement<T>(array: T[]): T {
        const randomIndex: number = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    getRandomNth(count: number) {
        return Math.floor(Math.random() * count);
    }
}
