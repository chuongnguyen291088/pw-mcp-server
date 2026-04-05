import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PerformancePage extends BasePage {
    constructor(page: Page, name = 'Performance Page') {
        super(page, name);
        this.pageHeading = this.page.getByRole('heading', { name: 'Performance' });
    }
}
