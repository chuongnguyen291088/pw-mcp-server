import { Locator } from "@playwright/test";
import { BaseElement } from "./BaseElement";

export class FileUpload extends BaseElement {
    constructor(locator: Locator, name: string) {
        super(locator, name);
    }

    async uploadFile(filePath: string): Promise<void> {
        try {
            await this.locator.setInputFiles(filePath);
        } catch (error) {
            console.error(`[FAILED] - Unable to upload file to ${this.name}`);
            throw error;
        }
    }

    async uploadMultipleFiles(filePaths: string[]): Promise<void> {
        try {
            await this.locator.setInputFiles(filePaths);
        } catch (error) {
            console.error(`[FAILED] - Unable to upload multiple files to ${this.name}`);
            throw error;
        }
    }

    async clearFiles(): Promise<void> {
        try {
            await this.locator.setInputFiles([]);
        } catch (error) {
            console.error(`[FAILED] - Unable to clear files of ${this.name}`);
            throw error;
        }
    }
}