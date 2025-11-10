import { Page } from "@playwright/test";
import { RequestHandler } from "../utils/requestHandler";

export abstract class BaseEntities {
    protected readonly api: RequestHandler;

    constructor(api: RequestHandler) {
        this.api = api;
    }
}