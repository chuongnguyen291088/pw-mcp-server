import { Locator } from "@playwright/test";
import { BaseElement } from "./BaseElement";

export class Tab extends BaseElement {
    constructor(locator: Locator, name: string) {
        super(locator, name);
    }

    async select(): Promise<void> {
        try {
            await this.locator.click();
        } catch (error) {
            console.error(`[FAILED] - Unable to select tab ${this.name}`);
            throw error;
        }
    }

    async isActive(): Promise<boolean> {
        try {
            const classAttr = await this.locator.getAttribute("class") ?? "";
            const ariaSelected = await this.locator.getAttribute("aria-selected") ?? "";
            return classAttr.includes("active") || classAttr.includes("selected") || ariaSelected === "true";
        } catch (error) {
            console.error(`[FAILED] - Unable to get active state of tab ${this.name}`);
            return false;
        }
    }

    async getText(): Promise<string> {
        try {
            return await this.locator.textContent() ?? "";
        } catch (error) {
            console.error(`[FAILED] - Unable to get text of tab ${this.name}`);
            throw error;
        }
    }
}