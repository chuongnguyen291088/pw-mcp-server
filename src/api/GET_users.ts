import { RequestHandler } from "../../utils/requestHandler";
import { BaseEntities } from "../baseEntities";

export class GET_users extends BaseEntities {
    constructor(api: RequestHandler) {
        super(api)
    }

    async send() {
        return await this.api
            .path('/web/index.php/api/v2/admin/users')
            .params({
                "limit": "50",
                "offset": "0",
                "sortField": "u.userName",
                "sortOrder": "ASC"
            })
            .GET(200)
    }
}