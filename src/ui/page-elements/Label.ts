import { Locator } from "@playwright/test";
import { BaseElement } from "./BaseElement"

export class Label extends BaseElement {
    constructor(locator: Locator, name: string) {
        super(locator, name)
    }

    async getText(): Promise<string> {
        try {
            return await this.locator.textContent() ?? "";
        } catch (error) {
            console.error(`[FAILED] - Unable to get text of ${this.name}`);
            throw error;
        }
    }

    async getInnerText(): Promise<string> {
        try {
            return await this.locator.innerText();
        } catch (error) {
            console.error(`[FAILED] - Unable to get inner text of ${this.name}`);
            throw error;
        }
    }
}