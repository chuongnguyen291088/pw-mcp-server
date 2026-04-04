import { Page } from "@playwright/test";
import {
    LoginPage,
    DashboardPage,
    AdminPage,
    PimPage,
    LeavePage,
    TimePage,
    RecruitmentPage,
    MyInfoPage,
    PerformancePage,
    DirectoryPage,
    MaintenancePage,
    ClaimPage,
    BuzzPage
} from "./BasePageIndexes";

export class PageManager {
    private readonly loginPage: LoginPage
    private readonly dashboardPage: DashboardPage
    private readonly adminPage: AdminPage
    private readonly pimPage: PimPage
    private readonly leavePage: LeavePage
    private readonly timePage: TimePage
    private readonly recruitmentPage: RecruitmentPage
    private readonly myInfoPage: MyInfoPage
    private readonly performancePage: PerformancePage
    private readonly directoryPage: DirectoryPage
    private readonly maintenancePage: MaintenancePage
    private readonly claimPage: ClaimPage
    private readonly buzzPage: BuzzPage

    constructor(readonly page: Page) {
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.dashboardPage = new DashboardPage(this.page)
        this.adminPage = new AdminPage(this.page)
        this.pimPage = new PimPage(this.page)
        this.leavePage = new LeavePage(this.page)
        this.timePage = new TimePage(this.page)
        this.recruitmentPage = new RecruitmentPage(this.page)
        this.myInfoPage = new MyInfoPage(this.page)
        this.performancePage = new PerformancePage(this.page)
        this.directoryPage = new DirectoryPage(this.page)
        this.maintenancePage = new MaintenancePage(this.page)
        this.claimPage = new ClaimPage(this.page)
        this.buzzPage = new BuzzPage(this.page)
    }

    onLoginPage() {
        return this.loginPage
    }

    onDashboardPage() {
        return this.dashboardPage
    }

    onAdminPage() {
        return this.adminPage
    }

    onPIMPage() {
        return this.pimPage
    }

    onLeavePage() {
        return this.leavePage
    }

    onTimePage() {
        return this.timePage
    }

    onRecruitmentPage() {
        return this.recruitmentPage
    }

    onMyInfoPage() {
        return this.myInfoPage
    }

    onPerformancePage() {
        return this.performancePage
    }

    onDirectoryPage() {
        return this.directoryPage
    }

    onMaintenancePage() {
        return this.maintenancePage
    }

    onClaimPage() {
        return this.claimPage
    }

    onBuzzPage() {
        return this.buzzPage
    }
}