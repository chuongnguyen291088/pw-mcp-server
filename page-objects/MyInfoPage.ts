import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class MyInfoPage extends BasePage {
    constructor(page: Page) {
        super(page);
        this.pageHeading = this.page.getByRole('heading', { name: 'PIM' });
    }
}
