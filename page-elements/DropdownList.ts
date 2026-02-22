import { Locator } from "@playwright/test";
import { BaseElement } from "./BaseElement";

export class DropdownList extends BaseElement {
    constructor(locator: Locator, name: string) {
        super(locator, name);
    }

    async selectByValue(value: string): Promise<void> {
        try {
            await this.locator.selectOption({ value });
        } catch (error) {
            console.error(`[FAILED] - Unable to select value "${value}" in ${this.name}`);
            throw error;
        }
    }

    async selectByLabel(label: string): Promise<void> {
        try {
            await this.locator.selectOption({ label });
        } catch (error) {
            console.error(`[FAILED] - Unable to select label "${label}" in ${this.name}`);
            throw error;
        }
    }

    async selectByIndex(index: number): Promise<void> {
        try {
            await this.locator.selectOption({ index });
        } catch (error) {
            console.error(`[FAILED] - Unable to select index ${index} in ${this.name}`);
            throw error;
        }
    }

    async getSelectedValue(): Promise<string> {
        try {
            return await this.locator.inputValue();
        } catch (error) {
            console.error(`[FAILED] - Unable to get selected value of ${this.name}`);
            throw error;
        }
    }

    async getOptions(): Promise<string[]> {
        try {
            return await this.locator.locator("option").allTextContents();
        } catch (error) {
            console.error(`[FAILED] - Unable to get options of ${this.name}`);
            throw error;
        }
    }
}