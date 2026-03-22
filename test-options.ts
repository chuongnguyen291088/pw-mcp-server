import { test as base } from "@playwright/test";
import { RequestHandler } from "./utils/requestHandler";
import { APILogger } from "./utils/apiLogger";
import { PageManager } from "./page-objects/PageManager";

export type TestOptions = {
    api: RequestHandler,
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    page: async ({ page }, use) => {
        await page.goto('/web/index.php/dashboard/index', { waitUntil: 'domcontentloaded' });
        await page.getByRole('heading', { name: 'Dashboard' }).waitFor({ state: 'visible' });
        await use(page);
    },

    pageManager: async ({ page }, use) => {
        const pm = new PageManager(page)
        await pm.page.goto('/web/index.php/dashboard/index', { waitUntil: 'domcontentloaded' });
        await pm.page.getByRole('heading', { name: 'Dashboard' }).waitFor({ state: 'visible' });
        await use(pm)
    },

    api: async ({ request }, use) => {
        const logger = new APILogger()
        const api = new RequestHandler(request, logger)
        await use(api)
    }
})

export { expect } from "@playwright/test"
export { step } from "./utils/step"