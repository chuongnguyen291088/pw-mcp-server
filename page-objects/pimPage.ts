import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class PIMPage extends BasePage {
    // Page elements
    private readonly pageLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.pageLocator = this.page.getByRole('heading', { name: 'PIM' });
    }

    async isOnPage(): Promise<boolean> {
        try {
            await this.pageLocator.waitFor({ state: 'visible' })
        } catch (error) {
            return false
        }
        return await this.pageLocator.isVisible();
    }
}