import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class BuzzPage extends BasePage {
    constructor(page: Page, name = 'Buzz Page') {
        super(page, name);
        this.pageHeading = this.page.getByRole('heading', { name: 'Buzz' });
    }
}
