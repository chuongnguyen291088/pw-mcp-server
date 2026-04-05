import { UserManagementController } from "@api/controllers/userManagementController";
import { prepareContactDetailsPayload } from "@factories/contact-details.factory";
import { prepareNewEmployeePayload } from "@factories/employee.factory";
import { prepareNewUserPayload } from "@factories/user.factory";
import { NewEmployeeResponseSchema } from "@schemas/responses/NewEmployee.schema";
import { NewUserResponseSchema } from "@schemas/responses/NewUser.schema";
import { test, expect } from "../../src/config/test-options";
import { z } from "zod";

type NewEmployeeRes = z.infer<typeof NewEmployeeResponseSchema>;
type NewUserRes = z.infer<typeof NewUserResponseSchema>

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

for (let i = 0; i < 20; i++) {
    test(`verify api fixture - iteration ${i + 1}`, async ({ api }) => {
        let userManagementController = new UserManagementController(api)

        let empNumber: number;
        await test.step('create new employee', async () => {
            const res = await userManagementController.createNewEmployee(prepareNewEmployeePayload())
            const newEmployeeRes: NewEmployeeRes = NewEmployeeResponseSchema.parse(await res.json())
            empNumber = newEmployeeRes.data.empNumber
        });

        let newUserResponse: NewUserRes;
        await test.step('create new user', async () => {
            newUserResponse = await userManagementController.createNewUser(prepareNewUserPayload({
                empNumber: empNumber
            }));
        });

        await test.step('update contact details', async () => {
            await userManagementController.updateContactDetails(empNumber, prepareContactDetailsPayload());
        });

        await test.step('verify that the created user appears on the user list', async () => {
            const userList = await userManagementController.getUserNameList();
            const expectedUserName = newUserResponse.data.userName;
            expect(userList).toContain(expectedUserName);
        });
    });
}