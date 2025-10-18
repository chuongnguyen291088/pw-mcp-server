import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class DashboardPage extends BasePage {
    // Page elements
    private readonly dashboardHeading: Locator;

    constructor(page: Page) {
        super(page);
        this.dashboardHeading = this.page.getByRole('heading', { name: 'Dashboard' });
    }

    /**
     * Check if dashboard is displayed
     */
    async isDashboardDisplayed(): Promise<boolean> {
        return await this.dashboardHeading.isVisible();
    }

    /**
     * Verify user is on dashboard page
     */
    async verifyDashboardPage() {
        await this.verifyUrl('dashboard');
        await expect(this.dashboardHeading).toBeVisible();
    }
}