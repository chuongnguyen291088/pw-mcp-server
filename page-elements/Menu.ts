import { Locator } from "@playwright/test";
import { BaseElement } from "./BaseElement";

export class Menu extends BaseElement {
    constructor(locator: Locator, name: string) {
        super(locator, name);
    }

    async selectItem(text: string): Promise<void> {
        try {
            await this.locator.locator(`text=${text}`).click();
        } catch (error) {
            console.error(`[FAILED] - Unable to select item "${text}" in ${this.name}`);
            throw error;
        }
    }

    async getItems(): Promise<string[]> {
        try {
            return await this.locator.locator("li, [role='menuitem'], a").allTextContents();
        } catch (error) {
            console.error(`[FAILED] - Unable to get items of ${this.name}`);
            throw error;
        }
    }

    async getItemCount(): Promise<number> {
        try {
            return await this.locator.locator("li, [role='menuitem'], a").count();
        } catch (error) {
            console.error(`[FAILED] - Unable to get item count of ${this.name}`);
            throw error;
        }
    }

    async hoverItem(text: string): Promise<void> {
        try {
            await this.locator.locator(`text=${text}`).hover();
        } catch (error) {
            console.error(`[FAILED] - Unable to hover item "${text}" in ${this.name}`);
            throw error;
        }
    }
}