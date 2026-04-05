import { RequestHandler, RequestOptions } from "@api/base/RequestHandler";

export abstract class BaseApi {
    protected readonly api: RequestHandler;

    constructor(api: RequestHandler) {
        this.api = api;
    }
}