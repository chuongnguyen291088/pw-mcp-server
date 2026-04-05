import { RequestHandler } from "@utils/requestHandler";
import { GET_users } from "@api/GET_users";
import { POST_new_employee } from "@api/POST_new_employee";
import { POST_new_user } from "@api/POST_new_user";
import { PUT_contact_details } from "@api/PUT_contact_details";
import { BaseEntities } from "../baseEntities";
import { z } from "zod";
import { UserListResponseSchema } from "@entities/schemas/responses/UserList.schema";
import { NewEmployeeResponseSchema } from "@entities/schemas/responses/NewEmployee.schema";

type UserListResponse = z.infer<typeof UserListResponseSchema>;
type NewEmployeeResponse = z.infer<typeof NewEmployeeResponseSchema>
export class UserManagementController extends BaseEntities {
    constructor(api: RequestHandler) {
        super(api);
    }

    async createNewEmployee(rq: Record<string, any>) {
        const createNewEmployeeApi = new POST_new_employee(this.api);
        return await createNewEmployeeApi.send(rq);
    };

    async getEmpNumber(rq: Record<string, any>): Promise<number> {
        const res = await this.createNewEmployee(rq);
        const newEmployeeRes: NewEmployeeResponse = await res.json();
        return newEmployeeRes.data.empNumber;
    };


    async createNewUser(rq: Record<string, any>) {
        const createNewUserApi = new POST_new_user(this.api);
        const res = await createNewUserApi.send(rq);
        return await res.json();
    };

    async updateContactDetails(empNumber: number, rq: Record<string, any>) {
        const updateContactDetails = new PUT_contact_details(this.api);
        const res = await updateContactDetails.send(empNumber, rq);
        return await res.json();
    }

    async getUserNameList(): Promise<string[]> {
        const getUserList = new GET_users(this.api);
        const res = await getUserList.send();
        const userList: UserListResponse = UserListResponseSchema.parse(await res.json())
        // const userListEntity: UserListEntity = await res.json();
        return userList.data.map(user => user.userName);
    }
}