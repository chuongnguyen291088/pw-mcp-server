import { Locator } from "@playwright/test";
import { BaseElement } from "./BaseElement";

export class Button extends BaseElement {
    constructor(locator: Locator, name: string) {
        super(locator, name);
    }

    async click(): Promise<void> {
        try {
            await this.locator.click();
        } catch (error) {
            console.error(`[FAILED] - Unable to click ${this.name}`);
            throw error;
        }
    }
}