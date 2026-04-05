import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RecruitmentPage extends BasePage {
    constructor(page: Page, name = 'Recruitment Page') {
        super(page, name);
        this.pageHeading = this.page.getByRole('heading', { name: 'Recruitment' });
    }
}
