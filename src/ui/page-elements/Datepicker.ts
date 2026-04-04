import { Locator } from "@playwright/test";
import { BaseElement } from "./BaseElement";

export class Datepicker extends BaseElement {
    constructor(locator: Locator, name: string) {
        super(locator, name);
    }

    async setDate(date: string): Promise<void> {
        try {
            await this.locator.fill(date);
        } catch (error) {
            console.error(`[FAILED] - Unable to set date "${date}" for ${this.name}`);
            throw error;
        }
    }

    async getDate(): Promise<string> {
        try {
            return await this.locator.inputValue();
        } catch (error) {
            console.error(`[FAILED] - Unable to get date of ${this.name}`);
            throw error;
        }
    }

    async clear(): Promise<void> {
        try {
            await this.locator.clear();
        } catch (error) {
            console.error(`[FAILED] - Unable to clear ${this.name}`);
            throw error;
        }
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