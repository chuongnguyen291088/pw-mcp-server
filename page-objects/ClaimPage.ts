import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ClaimPage extends BasePage {
    // Page elements
    private readonly pageLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.pageLocator = this.page.getByRole('heading', { name: 'Claim' }).first();
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