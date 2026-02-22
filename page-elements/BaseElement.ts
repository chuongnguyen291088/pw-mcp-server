import { Locator, Page } from "@playwright/test";

export abstract class BaseElement {
    protected constructor(protected locator: Locator, protected name: string) { }

    async scrollToElement(): Promise<void> {
        try {
            await this.locator.scrollIntoViewIfNeeded();
        } catch (error) {
            console.error(`[FAILED] - Unable to scroll to ${this.name}`)
            throw error;
        }
    }

    async isVisible(): Promise<boolean> {
        try {
            return await this.locator.isVisible();
        } catch (error) {
            console.error(`[FAILED] - ${this.name} is not visible`);
            return false;
        }
    }

    async isHidden(): Promise<boolean> {
        try {
            return await this.locator.isHidden();
        } catch (error) {
            console.error(`[FAILED] - ${this.name} is not hidden`);
            return false;
        }
    }

    async isEnabled(): Promise<boolean> {
        try {
            return await this.locator.isEnabled();
        } catch (error) {
            console.error(`[FAILED] - ${this.name} is not enabled`);
            return false;
        }
    }

    async waitForVisible(): Promise<void> {
        try {
            await this.locator.waitFor({ state: 'visible' });
        } catch (error) {
            console.error(`[FAILED] - ${this.name} is not visible`);
            throw error;
        }
    }

    async waitForHidden(): Promise<void> {
        try {
            await this.locator.waitFor({ state: 'hidden' });
        } catch (error) {
            console.error(`[FAILED] - ${this.name} is not hidden`);
            throw error;
        }
    }

    getLocator(): Locator {
        return this.locator;
    }

    getName(): string {
        return this.name;
    }
}