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

    public getRandomElement<T>(array: T[]): T {
        const randomIndex: number = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    public getRandomNth(count: number) {
        return Math.floor(Math.random() * count);
    }

    public sumArray(numbers: number[]): number {
        return numbers.reduce((a, b) => a + b, 0);
    }

    public stringToNumb(str): number {
        return parseFloat(str.replace("$", ""));
    }

    public stringArrToNumbArr(stringArr: string[]): number[] {
        return stringArr.map(str => parseFloat(str.replace('$', '')));
    }

    // const Timestamp = Math.floor(Date.now() / 1000)

}
