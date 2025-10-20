import { test as base } from "@playwright/test";
import { LoginPage } from "./page-objects/loginPage";
import { DashboardPage } from "./page-objects/dashboardPage";
import { PageManager } from "./page-objects/pageManager";

const authPathFile = '.auth/user.json'

export type TestOptions = {
    pageManager: PageManager
    loginPage: LoginPage,
    dashboardPage: DashboardPage,
}

export const test = base.extend<TestOptions>({
    page: async ({ browser }, use) => {
        console.log('📋 [INFO] - username:', process.env.ADMIN_USER_NAME)
        console.log('📋 [INFO] - password:', process.env.ADMIN_PASSWORD)

        const context = await browser.newContext({
            // recordVideo: {
            //     dir: './test-results/videos',
            //     size: { width: 1280, height: 720 }
            // },
        })
        const page = await context.newPage()

        const loginResponse = await context.request.get('/web/index.php/auth/login')
        const htmlSourceText = await loginResponse.text()

        const matcher = htmlSourceText.match(/:token="&quot;(.+?)&quot;"/)
        const csrfToken = matcher ? matcher[1] : null
        if (csrfToken) {
            console.log('📋 [INFO] - CSRF Token:', csrfToken)
            process.env['CSRF_TOKEN'] = csrfToken
        } else {
            throw new Error(`❌ [FAILED] - Failed to extract CSRF token`)
        }


        const validateResponse = await context.request.post('/web/index.php/auth/validate',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
                },
                form: {
                    username: process.env.ADMIN_USER_NAME,
                    password: process.env.ADMIN_PASSWORD,
                    _token: csrfToken
                }
            }
        )

        if (validateResponse.status() != 200) {
            throw new Error(`❌ [FAILED] - Failed to validate`)
        }

        const cookies = await context.cookies()
        await context.addCookies(cookies)

        await use(page)

        await context.close()
    },

    pageManager: async ({ page }, use) => {
        const pm = new PageManager(page)
        await use(pm)
    },

    dashboardPage: async ({ page }, use) => {
        const dashboardPage = new DashboardPage(page)
        await use(dashboardPage)
    }
})

export { expect } from "@playwright/test"