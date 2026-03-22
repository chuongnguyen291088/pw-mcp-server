import { Page, Locator, expect } from "@playwright/test";
import { step } from "../utils/step";

export abstract class BasePage {
    private readonly userDropdown: Locator;
    private readonly logoutButton: Locator;
    protected name: string;
    protected pageHeading: Locator;

    protected constructor(protected readonly page: Page, name: string) {
        this.page = page;
        this.name = name;
        this.userDropdown = this.page.locator('.oxd-userdropdown-tab');
        this.logoutButton = this.page.getByRole('menuitem', { name: 'Logout' });
    }

    @step('Verify that page load correctly')
    async isOnPage(): Promise<boolean> {
        try {
            await this.pageHeading.waitFor({ state: 'visible' });
        } catch (error) {
            return false;
        }
        return await this.pageHeading.isVisible();
    }

    /**
     * Navigate to a specific URL
     * @param url The URL to navigate to
     */
    @step('Navigation to the page')
    async navigate(url: string) {
        await this.page.goto(url);
    }

    /**
     * Wait for page load state
     */
    @step('Wait for page load completely')
    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * Check if element is visible
     * @param selector The selector to check
     */
    @step('Wait for element is visible')
    async isVisible(selector: string | Locator): Promise<boolean> {
        const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
        return await element.isVisible();
    }

    /**
     * Get page title
     */
    @step('Get page title')
    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * Get current URL
     */
    @step('Get current Url')
    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    /**
     * Verify page URL contains specific path
     * @param path Expected path in URL
     */
    @step('Verify that page load correct Url')
    async verifyUrl(path: string) {
        await expect(this.page).toHaveURL(new RegExp(path));
    }

    /**
     * Perform logout action
     */
    @step('Logout')
    async logout() {
        await this.userDropdown.click();
        await this.logoutButton.click();
        await this.waitForPageLoad();
    }

    @step('Expand the menu')
    async expandMenu() {
        const menuSection = this.page.locator('aside.oxd-sidepanel')
        const menuSectionAttribute = await menuSection.getAttribute('class')
        if (menuSectionAttribute.includes('toggled')) {
            await this.page.locator('button[class="oxd-icon-button oxd-main-menu-button"]').click()
        }
    }

    @step('Navigate to the Admin page')
    async navigateToAdminPage() {
        await this.expandMenu()
        await this.page.getByRole('link', { name: 'Admin', exact: true }).click()
    }


    @step('Navigate to the PIM page')
    async navigateToPIMPage() {
        await this.expandMenu()
        await this.page.getByRole('link', { name: 'PIM', exact: true }).click()
    }

    @step('Navigate to the Leave page')
    async navigateToLeavePage() {
        await this.expandMenu()
        await this.page.getByRole('link', { name: 'Leave', exact: true }).click()
    }

    @step('Navigate to the Time page')
    async navigateToTimePage() {
        await this.expandMenu()
        await this.page.getByRole('link', { name: 'Time', exact: true }).click()
    }

    @step('Navigate to the Recruitment page')
    async navigateToRecruitmentPage() {
        await this.expandMenu()
        await this.page.getByRole('link', { name: 'Recruitment', exact: true }).click()
    }

    @step('Navigate to My Info page')
    async navigateToMyInfoPage() {
        await this.expandMenu()
        await this.page.getByRole('link', { name: 'My Info', exact: true }).click()
    }

    @step('Navigate to the Performance page')
    async navigateToPerformancePage() {
        await this.expandMenu()
        await this.page.getByRole('link', { name: 'Performance', exact: true }).click()
    }

    @step("Navigate to the Dashboard page")
    async navigateToDashboardPage() {
        await this.expandMenu()
        await this.page.getByRole('link', { name: 'Dashboard', exact: true }).click()
    }

    @step('Navigate to the Directory page')
    async navigateToDirectoryPage() {
        await this.expandMenu()
        await this.page.getByRole('link', { name: 'Directory', exact: true }).click()
    }

    @step("Navigate to the Maintenance page")
    async navigateToMaintenancePage() {
        await this.expandMenu()
        await this.page.getByRole('link', { name: 'Maintenance', exact: true }).click()
    }

    @step('Navigate to the Claim page')
    async navigateToClaimPage() {
        await this.expandMenu()
        await this.page.getByRole('link', { name: 'Claim', exact: true }).click()
    }

    @step('Navigate to the Buzz page')
    async navigateToBuzzPage() {
        await this.expandMenu()
        await this.page.getByRole('link', { name: 'Buzz', exact: true }).click()
    }
}