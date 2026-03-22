import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DirectoryPage extends BasePage {
    constructor(page: Page, name = 'Directory Page') {
        super(page, name);
        this.pageHeading = this.page.getByRole('heading', { name: 'Directory' }).first();
    }
}
