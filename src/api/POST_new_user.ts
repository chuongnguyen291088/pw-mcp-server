import { RequestHandler } from "../../utils/requestHandler";
import { BaseEntities } from "../baseEntities";
import { NewUserRequestDto } from "../requestDto/newUserRequestDto";

export class POST_new_user extends BaseEntities {
    constructor(api: RequestHandler) {
        super(api)
    }

    async send(rq: NewUserRequestDto) {
        return await this.api
            .path('/web/index.php/api/v2/admin/users')
            .body(rq)
            .POST(200)
    }
}