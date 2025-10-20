import { test, expect } from '../test-options';

test.describe('Authenticated Tests', () => {
    test('should access dashboard directly using API authentication', async ({ page, dashboardPage }) => {
        // Navigate directly to dashboard (already authenticated via API)
        await page.goto('/web/index.php/dashboard/index');

        // Verify we're on dashboard
        await dashboardPage.verifyDashboardPage();
    });

    test('should access employee list using API authentication', async ({ page }) => {
        // Navigate to PIM page
        await page.goto('/web/index.php/pim/viewEmployeeList');

        // Verify we can access employee data
        await expect(page.getByRole('heading', { name: 'Employee Information' })).toBeVisible();
    });

    test('should maintain authentication between navigations', async ({ page, dashboardPage }) => {
        // Navigate to multiple pages
        await page.goto('/web/index.php/dashboard/index');
        await dashboardPage.verifyDashboardPage();

        await page.goto('/web/index.php/admin/viewSystemUsers');
        await expect(page.getByRole('heading', { name: 'System Users' })).toBeVisible();

        // Verify we're still authenticated
        await page.goto('/web/index.php/dashboard/index');
        await dashboardPage.verifyDashboardPage();
    });
});
