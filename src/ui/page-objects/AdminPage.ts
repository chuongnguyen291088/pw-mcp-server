import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AdminPage extends BasePage {
    constructor(page: Page, name = 'Admin Page') {
        super(page, name);
        this.pageHeading = this.page.getByRole('heading', { name: 'Admin' });
    }
}