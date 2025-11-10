import { EmployeeController } from "../src/controllers/employeeController";
import { CreateNewEmployeeRequestDto } from "../src/requestDto/createNewEmployeeRequestDto";
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

test('verify api fixture', async ({ api }) => {
    const rq: CreateNewEmployeeRequestDto = {
        empPicture: null,
        employeeId: faker.string.numeric(8),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: faker.person.middleName()
    };
    const employeeController = new EmployeeController(api);
    await employeeController.createNewEmployee(rq);
});