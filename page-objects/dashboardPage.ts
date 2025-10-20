import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class DashboardPage extends BasePage {
    // Page elements
    private readonly pageLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.pageLocator = this.page.getByRole('heading', { name: 'Dashboard' });
    }

    /**
     * Check if dashboard is displayed
     */
    async isOnPage(): Promise<boolean> {
        return await this.pageLocator.isVisible();
    }

    /**
     * Verify user is on dashboard page
     */
    async verifyDashboardPage() {
        await this.verifyUrl('dashboard');
        await expect(this.pageLocator).toBeVisible();
    }
}