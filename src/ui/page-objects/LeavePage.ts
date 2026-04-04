import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LeavePage extends BasePage {
    constructor(page: Page, name = 'Leave Page') {
        super(page, name);
        this.pageHeading = this.page.getByRole('heading', { name: 'Leave' }).first();
    }
}
