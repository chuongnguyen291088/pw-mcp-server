import { Locator } from "@playwright/test";
import { BaseElement } from "./BaseElement";

export class Dialog extends BaseElement {
    constructor(locator: Locator, name: string) {
        super(locator, name);
    }

    async getTitle(): Promise<string> {
        try {
            return await this.locator.locator("[class*='title'], [class*='header'], h1, h2, h3").first().textContent() ?? "";
        } catch (error) {
            console.error(`[FAILED] - Unable to get title of ${this.name}`);
            throw error;
        }
    }

    async getContent(): Promise<string> {
        try {
            return await this.locator.textContent() ?? "";
        } catch (error) {
            console.error(`[FAILED] - Unable to get content of ${this.name}`);
            throw error;
        }
    }

    async close(): Promise<void> {
        try {
            await this.locator.locator("[class*='close'], button:has-text('Close'), button:has-text('×')").first().click();
        } catch (error) {
            console.error(`[FAILED] - Unable to close ${this.name}`);
            throw error;
        }
    }

    async confirm(): Promise<void> {
        try {
            await this.locator.locator("button:has-text('OK'), button:has-text('Confirm'), button:has-text('Yes')").first().click();
        } catch (error) {
            console.error(`[FAILED] - Unable to confirm ${this.name}`);
            throw error;
        }
    }

    async cancel(): Promise<void> {
        try {
            await this.locator.locator("button:has-text('Cancel'), button:has-text('No')").first().click();
        } catch (error) {
            console.error(`[FAILED] - Unable to cancel ${this.name}`);
            throw error;
        }
    }
}