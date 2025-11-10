import { test as setup } from "@playwright/test";
import { RequestHandler } from "../../utils/requestHandler";
import { APILogger } from "../../utils/apiLogger";
import { logger } from "../../utils/logger";
import path from "path";
import fs from "fs/promises";

const authFilePath = path.join(__dirname, '../../.auth/auth.json')

setup('Orange HRM Authentication', async ({ browser }) => {
    const context = await browser.newContext();
    const request = await context.request;
    const apiLogger = new APILogger();
    const api = new RequestHandler(request, apiLogger);

    try {
        const loginRes =
            await api
                .path('/web/index.php/auth/login')
                .GET(200)

        const htmlSource = await loginRes.text();
        const csrfToken = htmlSource.match(/:token="&quot;(.+?)&quot;"/)?.[1]

        if (!csrfToken) {
            throw new Error('❌ csrfToken not found');
        }

        const validateForm = {
            _token: csrfToken,
            username: "Admin",
            password: "admin123"
        };
        const validateRes =
            await api
                .path('/web/index.php/auth/validate')
                .form(validateForm)
                .POST(302, { logResponseBody: false })

        const dashboardRes =
            await api
                .path('/web/index.php/dashboard/index')
                .GET(200, { logResponseBody: false })

        await context.storageState({ path: authFilePath });

    } catch (error) {
        logger.error('❌ Failed to authentication');
        throw error
    } finally {
        await context.close();
    }
})