import { Locator } from "@playwright/test";
import { BaseElement } from "./BaseElement";

export class Textbox extends BaseElement {
    constructor(locator: Locator, name: string) {
        super(locator, name);
    }

    async sendText(text: string): Promise<void> {
        try {
            await this.clearText();
            await this.locator.fill(text);
        } catch (error) {
            console.error(`[FAILED] - Unable to send text for ${this.name}`);
            throw error;
        }
    }

    async clearText(): Promise<void> {
        try {
            await this.locator.clear();
        } catch (error) {
            console.error(`[FAILED] - Unable to clear text for ${this.name}`);
            throw error;
        }
    }
}