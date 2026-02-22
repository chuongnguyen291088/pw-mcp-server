import { Locator } from "@playwright/test";
import { BaseElement } from "./BaseElement";

export class Slider extends BaseElement {
    constructor(locator: Locator, name: string) {
        super(locator, name);
    }

    async setValue(value: string): Promise<void> {
        try {
            await this.locator.fill(value);
        } catch (error) {
            console.error(`[FAILED] - Unable to set value "${value}" for ${this.name}`);
            throw error;
        }
    }

    async getValue(): Promise<string> {
        try {
            return await this.locator.inputValue();
        } catch (error) {
            console.error(`[FAILED] - Unable to get value of ${this.name}`);
            throw error;
        }
    }

    async getMin(): Promise<string> {
        try {
            return await this.locator.getAttribute("min") ?? "";
        } catch (error) {
            console.error(`[FAILED] - Unable to get min of ${this.name}`);
            throw error;
        }
    }

    async getMax(): Promise<string> {
        try {
            return await this.locator.getAttribute("max") ?? "";
        } catch (error) {
            console.error(`[FAILED] - Unable to get max of ${this.name}`);
            throw error;
        }
    }
}