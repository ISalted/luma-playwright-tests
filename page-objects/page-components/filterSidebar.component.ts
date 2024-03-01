import { step } from "../helpers/step";
import { BasePage } from "../helpers/basePage";
import { th } from "@faker-js/faker";

type ShoppingOptions = 'Style'
    | 'Size'
    | 'Price'
    | 'Color'
    | 'Material'
    | 'Features'
    | 'Performance Fabric'
    | 'Erin Recommends'
    | 'New'
    | 'Sale'
    | 'Climate'

type StyleOptions = 'Insulated' | 'Jacket' | 'Lightweight' | 'Hooded' | 'Heavy Duty' | 'Rain Coat' | 'Hard Shell';
export type SizeOptions = 'XS' | 'S' | 'M' | 'L' | 'XL' | '28' | '29' | '32' | '33' | '34' | '36'
type PriceOptions = '$20.00 - $29.99' | '$30.00 and above' | '$40.00 - $49.99' | '$50.00 - $59.99'
export type ColorOptions = 'Black' | 'Blue' | 'Brown' | 'Gray' | 'Green' | 'Orange' | 'Red' | 'White';
type MaterialOptions = 'Cotton' | 'LumaTech' | 'Lycra' | 'Polyester' | 'HeatTec' | 'Nylon';
type YesNoOptions = 'Yes' | 'No';
type PerformanceFabricOptions = 'Yes' | 'No';
type SaleOptions = 'Yes' | 'No';
type Climate = 'Cold' | 'Cool' | 'Indoor' | 'Mild' | 'Rainy' | 'Spring' | 'Warm';

type FilterOptions<T extends ShoppingOptions> =
    T extends 'Style' ? StyleOptions :
    T extends 'Size' ? SizeOptions :
    T extends 'Price' ? PriceOptions :
    T extends 'Color' ? ColorOptions :
    T extends 'Material' ? MaterialOptions :
    T extends 'Features' ? YesNoOptions :
    T extends 'Performance Fabric' ? PerformanceFabricOptions :
    T extends 'Climate' ? Climate :
    T extends 'New' ? YesNoOptions :
    T extends 'Sale' ? SaleOptions :
    never;


export class FilterSidebar extends BasePage {
    private root = this.page.locator('.sidebar-main')

    private nowShoppingBy = this.root.locator('.filter-current')
    public shoppingOption = (optionName: ShoppingOptions) => this.root.getByRole('tab', { name: `${optionName}` })


    @step()
    async isFilterOptVisibleInNowShopping(optionName: ShoppingOptions) {
        await this.shoppingOption(optionName).isVisible()
    }

    @step()
    async selectFilterOption<T extends ShoppingOptions>(optionName: T, filterOptions: FilterOptions<T>) {
        await this.shoppingOption(optionName).click()
        await this.shoppingOption(optionName).locator('..').getByRole('link', { name: filterOptions }).click({force:true})
        await this.nowShoppingBy.locator('.filter-value', { hasText: filterOptions }).waitFor()
    }



}


