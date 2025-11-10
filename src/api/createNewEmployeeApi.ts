import { RequestHandler } from "../../utils/requestHandler";
import { BaseEntities } from "../baseEntities";
import { CreateNewEmployeeRequestDto } from "../requestDto/createNewEmployeeRequestDto";

export class CreateNewEmployeeApi extends BaseEntities {
    protected createNewEmployeeApi: CreateNewEmployeeApi
    constructor(api: RequestHandler) {
        super(api);
    }

    async send(rq: CreateNewEmployeeRequestDto) {
        await this.api
            .path('/web/index.php/api/v2/pim/employees')
            .body(rq)
            .POST(200, { logRequestBody: true, logResponseBody: true })
    };
}