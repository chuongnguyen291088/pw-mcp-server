import { Locator } from "@playwright/test";
import { BaseElement } from "./BaseElement";

export class Checkbox extends BaseElement {
    constructor(locator: Locator, name: string) {
        super(locator, name);
    }

    async check(): Promise<void> {
        try {
            await this.locator.check();
        } catch (error) {
            console.error(`[FAILED] - Unable to check ${this.name}`);
            throw error;
        }
    }

    async uncheck(): Promise<void> {
        try {
            await this.locator.uncheck();
        } catch (error) {
            console.error(`[FAILED] - Unable to uncheck ${this.name}`);
            throw error;
        }
    }

    async isChecked(): Promise<boolean> {
        try {
            return await this.locator.isChecked();
        } catch (error) {
            console.error(`[FAILED] - Unable to get checked state of ${this.name}`);
            return false;
        }
    }
}