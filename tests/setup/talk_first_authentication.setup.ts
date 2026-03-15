import { test as setup } from "@playwright/test";
import { RequestHandler } from "../../utils/requestHandler";
import { APILogger } from "../../utils/apiLogger";
import { logger } from "../../utils/logger";
import path from "path";

const authFilePath = path.join(__dirname, '../../.auth/talkFirstAuth.json')

setup('Talk First Setup', async ({ browser }) => {
    const context = await browser.newContext();
    const request = context.request;
    const apiLogger = new APILogger();
    const api = new RequestHandler(request, apiLogger);

    try {
        const callLoginApi =
            await api.url('https://campus.talkfirst.vn')
                .path('/api/student/auth/login/')
                .body({
                    "email": process.env.TF_EMAIL,
                    "password": process.env.TF_PASSWORD
                })
                .POST(201, { logRequestBody: true, logResponseBody: true })

        const loginResponseInJson = await callLoginApi.json();
        const accessToken = loginResponseInJson.accessToken;

        if (!accessToken) {
            throw new Error("❌ accessToken not found");
        }

        process.env['TF_ACCESS_TOKEN'] = accessToken;
        console.log('✅ accessToken has been stored ' + accessToken)

        await context.storageState({ path: authFilePath });

    } catch (error) {
        logger.error('❌ Failed to authentication');
        throw error
    } finally {
        await context.close();
    }
})