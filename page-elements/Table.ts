import { Locator } from "@playwright/test";
import { BaseElement } from "./BaseElement";

export class Table extends BaseElement {
    constructor(locator: Locator, name: string) {
        super(locator, name);
    }

    async getRowCount(): Promise<number> {
        try {
            return await this.locator.locator("tbody tr").count();
        } catch (error) {
            console.error(`[FAILED] - Unable to get row count of ${this.name}`);
            throw error;
        }
    }

    async getColumnCount(): Promise<number> {
        try {
            return await this.locator.locator("thead th").count();
        } catch (error) {
            console.error(`[FAILED] - Unable to get column count of ${this.name}`);
            throw error;
        }
    }

    async getCellText(row: number, column: number): Promise<string> {
        try {
            return await this.locator.locator(`tbody tr:nth-child(${row}) td:nth-child(${column})`).textContent() ?? "";
        } catch (error) {
            console.error(`[FAILED] - Unable to get cell text at row ${row}, column ${column} of ${this.name}`);
            throw error;
        }
    }

    async getHeaderTexts(): Promise<string[]> {
        try {
            return await this.locator.locator("thead th").allTextContents();
        } catch (error) {
            console.error(`[FAILED] - Unable to get header texts of ${this.name}`);
            throw error;
        }
    }

    async getRowTexts(row: number): Promise<string[]> {
        try {
            return await this.locator.locator(`tbody tr:nth-child(${row}) td`).allTextContents();
        } catch (error) {
            console.error(`[FAILED] - Unable to get row texts at row ${row} of ${this.name}`);
            throw error;
        }
    }

    async clickCell(row: number, column: number): Promise<void> {
        try {
            await this.locator.locator(`tbody tr:nth-child(${row}) td:nth-child(${column})`).click();
        } catch (error) {
            console.error(`[FAILED] - Unable to click cell at row ${row}, column ${column} of ${this.name}`);
            throw error;
        }
    }
}