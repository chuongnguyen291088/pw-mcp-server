import { test } from '@playwright/test';
import { PageManager } from '../page-objects/PageManager';
import { properties } from '../properties.config';

const authFilePath = '.auth/user.json';
const testEnv = `@${properties.env}`;

test.describe('OrangeHRM Tests', {
    annotation: [
        { type: 'Epic', description: 'Signing in' },
        { type: 'Feature', description: 'Sign in with a password' },
        { type: 'Owner', description: 'Joachim Chuong D. Nguyen' }
    ]
}, () => {
    let pm: PageManager;

    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page);
        await pm.onLoginPage().navigateToLogin();
    });

    /**
     * * should login successfully with valid credentials
     */
    test('should login successfully with valid credentials', {
        annotation: [
            { type: 'Story Name', description: 'As an active user, I want to successfully sign in using a valid password' },
            { type: 'Story ID', description: 'XXX-001' }
        ],
        tag: [testEnv, '@TC-001']
    }, async ({ page }) => {

        await test.step('Given I am on the login page', async () => {
            await pm.onLoginPage().isOnPage();
        });

        await test.step('When I login with valid credentials', async () => {
            await pm.onLoginPage().login(process.env.ADMIN_USER_NAME, process.env.ADMIN_PASSWORD);
            await page.context().storageState({ path: authFilePath })
        });

        await test.step('Then I should be on the Dashboard page', async () => {
            await pm.onDashboardPage().verifyDashboardPage();
        });
    });

    /**
     * * should show error with invalid credentials
     */
    test('should show error with invalid credentials', {
        annotation: [
            { type: 'Story Name', description: 'As a user, I should see an error when signing in with invalid credentials' },
            { type: 'Story ID', description: 'XXX-002' }
        ],
        tag: [testEnv, '@TC-002']
    }, async () => {

        await test.step('Given I am on the login page', async () => {
            await pm.onLoginPage().isOnPage();
        });

        await test.step('When I login with invalid credentials', async () => {
            await pm.onLoginPage().login('invalid', 'invalid123');
        });

        await test.step('Then I should see an error message', async () => {
            await pm.onLoginPage().verifyErrorMessage('Invalid credentials');
        });
    });

    /**
     * * should logout successfully
     */
    test('should logout successfully', {
        annotation: [
            { type: 'Story Name', description: 'As a logged-in user, I want to successfully logout' },
            { type: 'Story ID', description: 'XXX-001' }
        ],
        tag: [testEnv, '@TC-003']
    }, async () => {

        await test.step('Given I am logged in', async () => {
            await pm.onLoginPage().login('Admin', 'admin123');
            await pm.onDashboardPage().verifyDashboardPage();
        });

        await test.step('When I logout', async () => {
            await pm.onDashboardPage().logout();

        });

        await test.step('Then I should be back on the login page', async () => {
            await pm.onLoginPage().isOnPage();

        });
    });
});