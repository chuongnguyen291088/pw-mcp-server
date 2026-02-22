import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RecruitmentPage extends BasePage {
    // Page elements
    private readonly pageLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.pageLocator = this.page.getByRole('heading', { name: 'Recruitment' });
    }

    async isOnPage(): Promise<boolean> {
        return await this.pageLocator.isVisible();
    }
}