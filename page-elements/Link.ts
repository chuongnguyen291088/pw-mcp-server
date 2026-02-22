import { Locator } from "@playwright/test";
import { BaseElement } from "./BaseElement";

export class Link extends BaseElement {
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

    async getHref(): Promise<string> {
        try {
            return await this.locator.getAttribute("href") ?? "";
        } catch (error) {
            console.error(`[FAILED] - Unable to get href of ${this.name}`);
            throw error;
        }
    }

    async getText(): Promise<string> {
        try {
            return await this.locator.textContent() ?? "";
        } catch (error) {
            console.error(`[FAILED] - Unable to get text of ${this.name}`);
            throw error;
        }
    }
}