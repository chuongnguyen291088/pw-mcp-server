import { BaseApi } from "@api/base/BaseApi";
import { RequestOptions } from "@api/base/RequestHandler";
import { NewEmployeeRequestSchema } from "@schemas/requests/NewEmployee.schema";
import { z } from "zod"

type NewEmployeePayload = z.infer<typeof NewEmployeeRequestSchema>;

export class EmployeeService extends BaseApi {
    private readonly basePath = '/web/index.php/api/v2/pim/employees';

    async create(payload: NewEmployeePayload, options?: RequestOptions) {
        return this.api
            .path(this.basePath)
            .body(payload)
            .POST(200, options)
    }
}