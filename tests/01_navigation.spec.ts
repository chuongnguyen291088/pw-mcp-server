import { test, expect } from '../test-options';

test.describe('Navigation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/web/index.php/dashboard/index')
    });

    test('verify that the dashboard page displays successfully', async ({ page, pageManager }) => {
        await test.step('verify that the dashboard page displays', async () => {
            await page.waitForTimeout(5 * 1000)
            const flag = await pageManager.onDashboardPage().isOnPage()
            expect(flag).toBeTruthy()
        })
    });

    test('verify that the admin page displays successfully', async ({ page, pageManager }) => {
        await test.step('navigate to the admin page', async () => {
            await pageManager.onAdminPage().navigateToAdminPage()
        })

        await test.step('verify that the admin page displays', async () => {
            await page.waitForTimeout(5 * 1000)
            const flag = await pageManager.onAdminPage().isOnPage()
            expect(flag).toBeTruthy()
        })
    });

    test('verify that the pim page displays successfully', async ({ page, pageManager }) => {
        await test.step('navigate to the pim page', async () => {
            await pageManager.onDashboardPage().navigateToPIMPage()
        })

        await test.step('verify that the pim page displays', async () => {
            await page.waitForTimeout(5 * 1000)
            const flag = await pageManager.onPIMPage().isOnPage()
            expect(flag).toBeTruthy()
        })
    });

    test('verify that the leave page displays successfully', async ({ page, pageManager }) => {
        await test.step('navigate to the leave page', async () => {
            await pageManager.onDashboardPage().navigateToLeavePage()
        })

        await test.step('verify that the leave page displays', async () => {
            await page.waitForTimeout(5 * 1000)
            const flag = await pageManager.onLeavePage().isOnPage()
            expect(flag).toBeTruthy()
        })
    });

    test('verify that the time page displays successfully', async ({ page, pageManager }) => {
        await test.step('navigate to the time page', async () => {
            await pageManager.onDashboardPage().navigateToTimePage()
        })

        await test.step('verify that the time page displays', async () => {
            await page.waitForTimeout(5 * 1000)
            const flag = await pageManager.onTimePage().isOnPage()
            expect(flag).toBeTruthy()
        })
    });

    test('verify that the recruitment page displays successfully', async ({ page, pageManager }) => {
        await test.step('navigate to the recruitment page', async () => {
            await pageManager.onDashboardPage().navigateToRecruitmentPage()
        })

        await test.step('verify that the recruitment page displays', async () => {
            await page.waitForTimeout(5 * 1000)
            const flag = await pageManager.onRecruitmentPage().isOnPage()
            expect(flag).toBeTruthy()
        })
    });

    test('verify that the my info page displays successfully', async ({ page, pageManager }) => {
        await test.step('navigate to the my info page', async () => {
            await pageManager.onDashboardPage().navigateToMyInfoPage()
        })

        await test.step('verify that the my info page displays', async () => {
            await page.waitForTimeout(5 * 1000)
            const flag = await pageManager.onMyInfoPage().isOnPage()
            expect(flag).toBeTruthy()
        })
    });

    test('verify that the performance page displays successfully', async ({ page, pageManager }) => {
        await test.step('navigate to the performance page', async () => {
            await pageManager.onDashboardPage().navigateToPerformancePage()
        })

        await test.step('verify that the performance page displays', async () => {
            await page.waitForTimeout(5 * 1000)
            const flag = await pageManager.onPerformancePage().isOnPage()
            expect(flag).toBeTruthy()
        })
    });

    test('verify that the directory page displays successfully', async ({ page, pageManager }) => {
        await test.step('navigate to the directory page', async () => {
            await pageManager.onDashboardPage().navigateToDirectoryPage()
        })

        await test.step('verify that the directory page displays', async () => {
            await page.waitForTimeout(5 * 1000)
            const flag = await pageManager.onDirectoryPage().isOnPage()
            expect(flag).toBeTruthy()
        })
    });

    test('verify that the maintenance page displays successfully', async ({ page, pageManager }) => {
        await test.step('navigate to the maintenance page', async () => {
            await pageManager.onDashboardPage().navigateToMaintenancePage()
        })

        await test.step('verify that the maintenance page displays', async () => {
            await page.waitForTimeout(5 * 1000)
            const flag = await pageManager.onMaintenancePage().isOnPage()
            expect(flag).toBeTruthy()
        })
    });

    test('verify that the claim page displays successfully', async ({ page, pageManager }) => {
        await test.step('navigate to the claim page', async () => {
            await pageManager.onDashboardPage().navigateToClaimPage()
        })

        await test.step('verify that the claim page displays', async () => {
            await page.waitForTimeout(5 * 1000)
            const flag = await pageManager.onClaimPage().isOnPage()
            expect(flag).toBeTruthy()
        })
    });

    test('verify that the buzz page displays successfully', async ({ page, pageManager }) => {
        await test.step('navigate to the buzz page', async () => {
            await pageManager.onDashboardPage().navigateToBuzzPage()
        })

        await test.step('verify that the buzz page displays', async () => {
            await page.waitForTimeout(5 * 1000)
            const flag = await pageManager.onBuzzPage().isOnPage()
            expect(flag).toBeTruthy()
        })
    });
});
