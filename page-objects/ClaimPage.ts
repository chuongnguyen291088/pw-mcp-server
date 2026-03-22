import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ClaimPage extends BasePage {
    constructor(page: Page, name = 'Claim Page') {
        super(page, name);
        this.pageHeading = this.page.getByRole('heading', { name: 'Claim' }).first();
    }
}
