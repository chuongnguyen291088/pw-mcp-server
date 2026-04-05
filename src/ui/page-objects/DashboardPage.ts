import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DashboardPage extends BasePage {
    constructor(page: Page, name = 'Dashboard Page') {
        super(page, name);
        this.pageHeading = this.page.getByRole('heading', { name: 'Dashboard' });
    }

    async verifyDashboardPage() {
        await this.verifyUrl('dashboard');
        await expect(this.pageHeading).toBeVisible();
    }
}