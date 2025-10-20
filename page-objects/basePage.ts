import { Page, Locator, expect } from "@playwright/test"

export abstract class BasePage {
    private readonly userDropdown: Locator;
    private readonly logoutButton: Locator;

    protected constructor(protected readonly page: Page) {
        this.page = page
        this.userDropdown = this.page.locator('.oxd-userdropdown-tab');
        this.logoutButton = this.page.getByRole('menuitem', { name: 'Logout' });
    }

    /**
     * Navigate to a specific URL
     * @param url The URL to navigate to
     */
    async navigate(url: string) {
        await this.page.goto(url);
    }

    /**
     * Wait for page load state
     */
    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * Check if element is visible
     * @param selector The selector to check
     */
    async isVisible(selector: string | Locator): Promise<boolean> {
        const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
        return await element.isVisible();
    }

    /**
     * Get page title
     */
    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * Get current URL
     */
    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    /**
     * Verify page URL contains specific path
     * @param path Expected path in URL
     */
    async verifyUrl(path: string) {
        await expect(this.page).toHaveURL(new RegExp(path));
    }

    /**
     * Perform logout action
     */
    async logout() {
        await this.userDropdown.click();
        await this.logoutButton.click();
        await this.waitForPageLoad();
    }

    async expandMenu() {
        const menuSection = this.page.locator('aside.oxd-sidepanel')
        const menuSectionAttribute = await menuSection.getAttribute('class')
        if (menuSectionAttribute.includes('toggled')) {
            await this.page.locator('button[class="oxd-icon-button oxd-main-menu-button"]').click()
        }
    }

    async navigateToAdminPage() {
        await this.expandMenu()
        await this.page.getByRole('link', { name: 'Admin', exact: true }).click()
    }

    async navigateToPIMPage() {
        await this.expandMenu()
        await this.page.getByRole('link', { name: 'PIM', exact: true }).click()
    }

    async navigateToLeavePage() {
        await this.expandMenu()
        await this.page.getByRole('link', { name: 'Leave', exact: true }).click()
    }

    async navigateToTimePage() {
        await this.expandMenu()
        await this.page.getByRole('link', { name: 'Time', exact: true }).click()
    }

    async navigateToRecruitmentPage() {
        await this.expandMenu()
        await this.page.getByRole('link', { name: 'Recruitment', exact: true }).click()
    }

    async navigateToMyInfoPage() {
        await this.expandMenu()
        await this.page.getByRole('link', { name: 'My Info', exact: true }).click()
    }

    async navigateToPerformancePage() {
        await this.expandMenu()
        await this.page.getByRole('link', { name: 'Performance', exact: true }).click()
    }

    async navigateToDashboardPage() {
        await this.expandMenu()
        await this.page.getByRole('link', { name: 'Dashboard', exact: true }).click()
    }

    async navigateToDirectoryPage() {
        await this.expandMenu()
        await this.page.getByRole('link', { name: 'Directory', exact: true }).click()
    }

    async navigateToMaintenancePage() {
        await this.expandMenu()
        await this.page.getByRole('link', { name: 'Maintenance', exact: true }).click()
    }

    async navigateToClaimPage() {
        this.expandMenu()
        await this.page.getByRole('link', { name: 'Claim', exact: true }).click()
    }

    async navigateToBuzzPage() {
        await this.expandMenu()
        await this.page.getByRole('link', { name: 'Buzz', exact: true }).click()
    }
}