import { UserManagementController } from "../src/controllers/userManagementController";
import { NewUserEntity } from "../src/entities/newUserEntity";
import { TestDataFactory } from "../helpers/TestDataFactory";
import { test, expect } from "../test-options";

test('verify pageManager fixture', async ({ pageManager }) => {
    let pm = pageManager

    await pm.onDashboardPage().isOnPage()

    await test.step('navigate to the pim page', async () => {
        await pm.onDashboardPage().navigateToPIMPage()
    })

    await test.step('verify that the pim page displays', async () => {
        const flag = await pm.onPIMPage().isOnPage()
        expect(flag).toBeTruthy()
    })

    await test.step('navigate to the time page', async () => {
        await pm.onDashboardPage().navigateToTimePage()
    })

    await test.step('verify that the time page displays', async () => {
        const flag = await pm.onTimePage().isOnPage()
        expect(flag).toBeTruthy()
    })
});

for (let i = 0; i < 2; i++) {
    test(`verify api fixture - iteration ${i + 1}`, async ({ api }) => {
        let userManagementController = new UserManagementController(api)

        let empNumber: number;
        await test.step('create new employee', async () => {
            empNumber = await userManagementController.getEmpNumber(TestDataFactory.buildNewEmployeeDto());
        });

        let newUserEntity: NewUserEntity
        await test.step('create new user', async () => {
            newUserEntity = await userManagementController.createNewUser(TestDataFactory.buildNewUserDto(empNumber));
        });

        await test.step('update contact details', async () => {
            await userManagementController.updateContactDetails(empNumber, TestDataFactory.buildContactDetailsDto());
        });

        await test.step('verify that the created user appears on the user list', async () => {
            const userList = await userManagementController.getUserNameList();
            const expectedUserName = newUserEntity.data.userName;
            expect(userList).toContain(expectedUserName);
        });
    });
}
