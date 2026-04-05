import { BaseApi } from "@api/base/BaseApi";
import { z } from "zod";
import { NewUserRequestSchema } from "@schemas/requests/NewUser.schema";
import { RequestOptions } from "@api/base/RequestHandler";

type NewUserPayload = z.infer<typeof NewUserRequestSchema>;

export class UserService extends BaseApi {

    private readonly basePath = '/web/index.php/api/v2/admin/users'

    async getUserList(options?: RequestOptions) {
        return await this.api
            .path(this.basePath)
            .params({
                "limit": "50",
                "offset": "0",
                "sortField": "u.userName",
                "sortOrder": "ASC"
            })
            .GET(200, options)
    }

    async createNewUser(payload: NewUserPayload, options?: RequestOptions) {
        return await this.api
            .path(this.basePath)
            .body(payload)
            .POST(200, options)
    }
}