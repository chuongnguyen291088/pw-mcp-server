import { test, expect } from '../test-options';

test.describe('Navigation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/web/index.php/dashboard/index')
    });

    test('verify that the dashboard page displays successfully', { tag: '@dashboard-page' }, async ({ pageManager }) => {
        const flag = await pageManager.onDashboardPage().isOnPage()
        expect(flag).toBeTruthy()
    });

    test('verify that the admin page displays successfully', { tag: '@admin-page' }, async ({ pageManager }) => {
        await pageManager.onAdminPage().navigateToAdminPage()
        expect(await pageManager.onAdminPage().isOnPage()).toBeTruthy()
    });

    test('verify that the pim page displays successfully', { tag: '@pim-page' }, async ({ pageManager }) => {
        await pageManager.onDashboardPage().navigateToPIMPage()
        expect(await pageManager.onPIMPage().isOnPage()).toBeTruthy()
    });

    test('verify that the leave page displays successfully', { tag: '@leave-page' }, async ({ pageManager }) => {
        await pageManager.onDashboardPage().navigateToLeavePage()
        expect(await pageManager.onLeavePage().isOnPage()).toBeTruthy()
    });

    test('verify that the time page displays successfully', { tag: '@time-page' }, async ({ pageManager }) => {
        await pageManager.onDashboardPage().navigateToTimePage()
        expect(await pageManager.onTimePage().isOnPage()).toBeTruthy()
    });

    test('verify that the recruitment page displays successfully', { tag: '@recruitment-page' }, async ({ pageManager }) => {
        await pageManager.onDashboardPage().navigateToRecruitmentPage()
        expect(await pageManager.onRecruitmentPage().isOnPage()).toBeTruthy()
    });

    test('verify that the my info page displays successfully', { tag: '@info-page' }, async ({ pageManager }) => {
        await pageManager.onDashboardPage().navigateToMyInfoPage()
        expect(await pageManager.onMyInfoPage().isOnPage()).toBeTruthy()
    });

    test('verify that the performance page displays successfully', { tag: '@performance-page' }, async ({ pageManager }) => {
        await pageManager.onDashboardPage().navigateToPerformancePage()
        expect(await pageManager.onPerformancePage().isOnPage()).toBeTruthy()
    });

    test('verify that the directory page displays successfully', { tag: '@directory-page' }, async ({ pageManager }) => {
        await pageManager.onDashboardPage().navigateToDirectoryPage()
        expect(await pageManager.onDirectoryPage().isOnPage()).toBeTruthy()
    });

    test('verify that the maintenance page displays successfully', { tag: '@maintenance-page' }, async ({ pageManager }) => {
        await pageManager.onDashboardPage().navigateToMaintenancePage()
        expect(await pageManager.onMaintenancePage().isOnPage()).toBeTruthy()
    });

    test('verify that the claim page displays successfully', { tag: '@claim-page' }, async ({ pageManager }) => {
        await pageManager.onDashboardPage().navigateToClaimPage()
        expect(await pageManager.onClaimPage().isOnPage()).toBeTruthy()
    });

    test('verify that the buzz page displays successfully', { tag: '@buzz-page' }, async ({ pageManager }) => {
        await pageManager.onDashboardPage().navigateToBuzzPage()
        expect(await pageManager.onBuzzPage().isOnPage()).toBeTruthy()
    });
})







