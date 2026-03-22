import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PimPage extends BasePage {
    constructor(page: Page, name = 'PIM Page') {
        super(page, name);
        this.pageHeading = this.page.getByRole('heading', { name: 'PIM' });
    }
}
