import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class MyInfoPage extends BasePage {
    constructor(page: Page, name = 'My Info Page') {
        super(page, name);
        this.pageHeading = this.page.getByRole('heading', { name: 'PIM' });
    }
}
