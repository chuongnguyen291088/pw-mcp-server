import { RequestHandler } from "@api/base/RequestHandler";
import { z } from "zod";
import { UserListResponseSchema } from "@schemas/responses/UserList.schema";
import { NewEmployeeResponseSchema } from "@schemas/responses/NewEmployee.schema";
import { EmployeeService } from "@api/services/EmployeeService";
import { UserService } from "@api/services/UserService";
import { ContactDetailsService } from "@api/services/ContactDetailsService";
import { NewEmployeeRequestSchema } from "@schemas/requests/NewEmployee.schema";
import { NewUserRequestSchema } from "@schemas/requests/NewUser.schema";
import { ContactDetailsRequestSchema } from "@schemas/requests/ContactDetails.schema";

//* request payload
type NewEmployeePayload = z.infer<typeof NewEmployeeRequestSchema>;
type NewUserPayload = z.infer<typeof NewUserRequestSchema>;
type ContactDetailsPayload = z.infer<typeof ContactDetailsRequestSchema>;

//* response
type UserListResponse = z.infer<typeof UserListResponseSchema>;
type NewEmployeeResponse = z.infer<typeof NewEmployeeResponseSchema>;

export class UserManagementController {
    readonly employeeService: EmployeeService;
    readonly userService: UserService;
    readonly contactDetailsService: ContactDetailsService

    constructor(api: RequestHandler) {
        this.employeeService = new EmployeeService(api);
        this.userService = new UserService(api);
        this.contactDetailsService = new ContactDetailsService(api)
    }

    async createNewEmployee(payload: NewEmployeePayload) {
        return await this.employeeService.create(payload)
    };

    async getEmpNumber(payload: NewEmployeePayload): Promise<number> {
        const res = await this.createNewEmployee(payload);
        const newEmployeeRes: NewEmployeeResponse = await res.json();
        return newEmployeeRes.data.empNumber;
    };


    async createNewUser(payload: NewUserPayload) {
        const res = await this.userService.createNewUser(payload)
        return await res.json();
    };

    async updateContactDetails(empNumber: number, payload: ContactDetailsPayload) {
        const res = await this.contactDetailsService.update(empNumber, payload)
        return await res.json();
    }

    async getUserNameList(): Promise<string[]> {
        const res = await this.userService.getUserList()
        const userList: UserListResponse = UserListResponseSchema.parse(await res.json())
        return userList.data.map(user => user.userName);
    }
}