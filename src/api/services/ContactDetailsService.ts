import { BaseApi } from "@api/base/BaseApi";
import { RequestOptions } from "@api/base/RequestHandler";
import { ContactDetailsRequestSchema } from "@schemas/requests/ContactDetails.schema";
import { z } from "zod";

type ContactDetailsPayload = z.infer<typeof ContactDetailsRequestSchema>;

export class ContactDetailsService extends BaseApi {

    async update(empNumber: number, payload: ContactDetailsPayload, options?: RequestOptions) {
        return await this.api
            .path(`/web/index.php/api/v2/pim/employee/${empNumber}/contact-details`)
            .body(payload)
            .PUT(200, options)
    }
}