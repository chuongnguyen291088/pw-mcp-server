import { test as base, BrowserContext, Page } from "@playwright/test";
import { LoginPage } from "./page-objects/LoginPage";
import { DashboardPage } from "./page-objects/DashboardPage";
import { PageManager } from "./page-objects/PageManager";
import { RequestHandler } from "./utils/requestHandler";
import { APILogger } from "./utils/apiLogger";
import { logger } from "./utils/logger";
import path from "path";

const authPathFile = '.auth/user.json'

export type TestOptions = {
    authenticatedContext: BrowserContext,
    api: RequestHandler,
    pageManager: PageManager
    loginPage: LoginPage,
    dashboardPage: DashboardPage,
    mixed: Page,
}

export const test = base.extend<TestOptions>({
    page: async ({ page }, use) => {
        await page.goto('/web/index.php/dashboard/index', { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(3 * 1000)
        await use(page);
    },

    pageManager: async ({ page }, use) => {
        const pm = new PageManager(page)
        await pm.page.goto('/web/index.php/dashboard/index', { waitUntil: 'domcontentloaded' });
        await pm.page.waitForTimeout(3 * 1000)
        await use(pm)
    },

    api: async ({ request }, use) => {
        const logger = new APILogger()
        const api = new RequestHandler(request, logger)
        await use(api)
    }
})

export { expect } from "@playwright/test"