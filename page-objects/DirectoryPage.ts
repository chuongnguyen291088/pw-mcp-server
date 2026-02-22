import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DirectoryPage extends BasePage {
    // Page elements
    private readonly pageLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.pageLocator = this.page.getByRole('heading', { name: 'Directory' }).first();
    }

    async isOnPage(): Promise<boolean> {
        return await this.pageLocator.isVisible();
    }
}