import { RequestHandler } from "../../utils/requestHandler";
import { BaseEntities } from "../baseEntities";
import { NewEmployeeRequestDto } from "../requestDto/newEmployeeRequestDto";

export class POST_new_employee extends BaseEntities {
    constructor(api: RequestHandler) {
        super(api);
    }

    async send(rq: NewEmployeeRequestDto) {
        return await this.api
            .path('/web/index.php/api/v2/pim/employees')
            .body(rq)
            .POST(200)
    };
}