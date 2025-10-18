import { Page } from "@playwright/test";
import { LoginPage } from "./loginPage"
import { DashboardPage } from "./dashboardPage";

export class PageManager {
    private readonly loginPage: LoginPage
    private readonly dashboardPage: DashboardPage

    constructor(readonly page: Page) {
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.dashboardPage = new DashboardPage(this.page)
    }

    onLoginPage() {
        return this.loginPage
    }

    onDashboardPage() {
        return this.dashboardPage
    }
}