import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class MaintenancePage extends BasePage {
    constructor(page: Page, name = 'Maintenance Page') {
        super(page, name);
        this.pageHeading = this.page.getByRole('heading', { name: 'Administrator Access' });
    }
}
