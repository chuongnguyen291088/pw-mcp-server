import { Locator } from "@playwright/test";
import { BaseElement } from "./BaseElement";

export class RadioButton extends BaseElement {
    constructor(locator: Locator, name: string) {
        super(locator, name);
    }

    async select(): Promise<void> {
        try {
            await this.locator.check();
        } catch (error) {
            console.error(`[FAILED] - Unable to select ${this.name}`);
            throw error;
        }
    }

    async isSelected(): Promise<boolean> {
        try {
            return await this.locator.isChecked();
        } catch (error) {
            console.error(`[FAILED] - Unable to get selected state of ${this.name}`);
            return false;
        }
    }
}