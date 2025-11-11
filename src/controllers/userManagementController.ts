import { RequestHandler } from "../../utils/requestHandler";
import { GET_users } from "../api/GET_users";
import { POST_new_employee } from "../api/POST_new_employee";
import { POST_new_user } from "../api/POST_new_user";
import { PUT_contact_details } from "../api/PUT_contact_details";
import { BaseEntities } from "../baseEntities";
import { NewEmployeeEntity } from "../entities/newEmployeeEntity";
import { UserListEntity } from "../entities/userListEntity";
import { ContactDetailsRequestDto } from "../requestDto/contactDetailsRequestDto";
import { NewEmployeeRequestDto } from "../requestDto/newEmployeeRequestDto";
import { NewUserRequestDto } from "../requestDto/newUserRequestDto";

export class UserManagementController extends BaseEntities {
    protected employeeController: UserManagementController

    constructor(api: RequestHandler) {
        super(api);
    }

    async createNewEmployee(rq: NewEmployeeRequestDto) {
        const createNewEmployeeApi = new POST_new_employee(this.api);
        return await createNewEmployeeApi.send(rq);
    };

    async getEmpNumber(rq: NewEmployeeRequestDto): Promise<number> {
        const res = await this.createNewEmployee(rq);
        const newEmployeeEntity: NewEmployeeEntity = await res.json();
        return newEmployeeEntity.data.empNumber;
    };

    async createNewUser(rq: NewUserRequestDto) {
        const createNewUserApi = new POST_new_user(this.api);
        const res = await createNewUserApi.send(rq);
        return await res.json();
    };

    async updateContactDetails(empNumber: number, rq: ContactDetailsRequestDto) {
        const updateContactDetails = new PUT_contact_details(this.api);
        const res = await updateContactDetails.send(empNumber, rq);
        return await res.json();
    }

    async getUserNameList(): Promise<string[]> {
        const getUserList = new GET_users(this.api);
        const res = await getUserList.send();
        const userListEntity: UserListEntity = await res.json();
        return userListEntity?.data?.map(user => user.userName);
    }
}