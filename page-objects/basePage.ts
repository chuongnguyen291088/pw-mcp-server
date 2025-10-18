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
}