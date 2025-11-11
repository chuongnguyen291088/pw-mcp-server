import { RequestHandler } from "../../utils/requestHandler";
import { BaseEntities } from "../baseEntities";
import { ContactDetailsRequestDto } from "../requestDto/contactDetailsRequestDto";

export class PUT_contact_details extends BaseEntities {
    constructor(api: RequestHandler) {
        super(api)
    }

    async send(empNumber: number, rq: ContactDetailsRequestDto) {
        return await this.api
            .path(`/web/index.php/api/v2/pim/employee/${empNumber}/contact-details`)
            .body(rq)
            .PUT(200, { logRequestBody: true, logResponseBody: true })
    }
}