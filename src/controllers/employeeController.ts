import { RequestHandler } from "../../utils/requestHandler";
import { CreateNewEmployeeApi } from "../api/createNewEmployeeApi";
import { BaseEntities } from "../baseEntities";
import { CreateNewEmployeeRequestDto } from "../requestDto/createNewEmployeeRequestDto";

export class EmployeeController extends BaseEntities {
    protected employeeController: EmployeeController

    constructor(api: RequestHandler) {
        super(api);
    }

    async createNewEmployee(rq: CreateNewEmployeeRequestDto) {
        const createNewEmployeeApi = new CreateNewEmployeeApi(this.api)
        await createNewEmployeeApi.send(rq)
    }
}