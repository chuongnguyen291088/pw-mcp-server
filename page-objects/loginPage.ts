import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
    // Page elements
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = this.page.getByPlaceholder('Username');
        this.passwordInput = this.page.getByPlaceholder('Password');
        this.loginButton = this.page.getByRole('button', { name: /login/i });
        this.errorMessage = this.page.locator('.oxd-alert-content-text');
    }

    /**
     * Navigate to login page
     */
    async navigateToLogin() {
        await this.navigate('/web/index.php/auth/login');
        await this.waitForPageLoad();
    }

    /**
     * Perform login action
     * @param username Username to login with
     * @param password Password to login with
     */
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    /**
     * Check if login page is displayed
     */
    async isLoginPageDisplayed(): Promise<boolean> {
        return await this.loginButton.isVisible();
    }

    /**
     * Get error message text if present
     */
    async getErrorMessage(): Promise<string | null> {
        if (await this.errorMessage.isVisible()) {
            return await this.errorMessage.textContent();
        }
        return null;
    }

    /**
     * Verify error message contains specific text
     * @param text Expected error message text
     */
    async verifyErrorMessage(text: string) {
        await expect(this.errorMessage).toContainText(text);
    }
}