import { Locator } from "@playwright/test";
import { BaseElement } from "./BaseElement";

export class Toggle extends BaseElement {
    constructor(locator: Locator, name: string) {
        super(locator, name);
    }

    async toggle(): Promise<void> {
        try {
            await this.locator.click();
        } catch (error) {
            console.error(`[FAILED] - Unable to toggle ${this.name}`);
            throw error;
        }
    }

    async turnOn(): Promise<void> {
        try {
            if (!(await this.isOn())) {
                await this.locator.click();
            }
        } catch (error) {
            console.error(`[FAILED] - Unable to turn on ${this.name}`);
            throw error;
        }
    }

    async turnOff(): Promise<void> {
        try {
            if (await this.isOn()) {
                await this.locator.click();
            }
        } catch (error) {
            console.error(`[FAILED] - Unable to turn off ${this.name}`);
            throw error;
        }
    }

    async isOn(): Promise<boolean> {
        try {
            return await this.locator.isChecked();
        } catch (error) {
            console.error(`[FAILED] - Unable to get state of ${this.name}`);
            return false;
        }
    }
}