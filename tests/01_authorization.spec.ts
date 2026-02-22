import { UserManagementController } from "../src/controllers/userManagementController";
import { NewUserEntity } from "../src/entities/newUserEntity";
import { ContactDetailsRequestDto } from "../src/requestDto/contactDetailsRequestDto";
import { NewEmployeeRequestDto } from "../src/requestDto/newEmployeeRequestDto";
import { NewUserRequestDto } from "../src/requestDto/newUserRequestDto";
import { test, expect } from "../test-options";
import { faker } from "@faker-js/faker";

test('verify pageManager fixture', async ({ pageManager }) => {
    let pm = pageManager

    await pm.page.waitForTimeout(5 * 1000)
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

for (let i = 0; i < 3; i++) {
    test(`verify api fixture - iteration ${i + 1}`, async ({ api }) => {
        let userManagementController = new UserManagementController(api)

        let empNumber: number;
        await test.step('create new employee', async () => {
            const createNewEmployeeRqDto: NewEmployeeRequestDto = {
                empPicture: null,
                employeeId: faker.string.numeric(8),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                middleName: faker.person.middleName()
            };

            empNumber = await userManagementController.getEmpNumber(createNewEmployeeRqDto);
        });

        let newUserEntity: NewUserEntity
        await test.step('create new user', async () => {
            const createNewUserRqDto: NewUserRequestDto = {
                username: `ndc.vn88+test${faker.string.numeric({ length: { min: 3, max: 10 } })}`,
                password: 'Welcome@01',
                status: true,
                userRoleId: 1,
                empNumber: empNumber
            };

            newUserEntity = await userManagementController.createNewUser(createNewUserRqDto);
        });

        await test.step('update contact details', async () => {
            const contactDetailsRqDto: ContactDetailsRequestDto = {
                city: 'Saigon',
                countryCode: 'VN',
                homeTelephone: `849${faker.string.numeric(8)}`,
                mobile: '84934352275',
                otherEmail: faker.internet.email(),
                province: faker.location.state(),
                street1: faker.location.street(),
                street2: faker.location.secondaryAddress(),
                workEmail: `ndc.vn88+test${faker.string.numeric({ length: { min: 3, max: 10 } })}@outlook.com`,
                workTelephone: `849${faker.string.numeric(8)}`,
                zipCode: faker.location.zipCode()
            };

            await userManagementController.updateContactDetails(empNumber, contactDetailsRqDto);
        });

        await test.step('verify that the created user appears on the user list', async () => {
            const userList = await userManagementController.getUserNameList();
            const expectedUserName = newUserEntity.data.userName;
            expect(userList).toContain(expectedUserName);
        });
    });
}
