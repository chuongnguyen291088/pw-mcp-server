import { test, APIRequestContext } from "@playwright/test";
import { APILogger } from "./apiLogger";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions {
    logRequestHeaders?: boolean;
    logRequestBody?: boolean;
    logResponseBody?: boolean;
}

export class RequestHandler {
    private request: APIRequestContext;
    private logger: APILogger;
    private baseURL?: string;
    private defaultBaseURL: string = process.env.API_HOST ?? '';
    private apiPath: string = '';
    private queryParams: Record<string, string> = {};
    private apiHeaders: Record<string, string> = {};
    private apiBody: object = {};

    constructor(request: APIRequestContext, logger: APILogger) {
        this.request = request;
        this.logger = logger;
    }

    url(url: string) {
        this.baseURL = url;
        return this;
    }

    path(path: string) {
        this.apiPath = path;
        return this;
    }

    params(params: Record<string, string>) {
        this.queryParams = params;
        return this;
    }

    headers(headers: Record<string, string>) {
        this.apiHeaders = headers;
        return this;
    }

    body(body: object) {
        this.apiBody = body;
        return this;
    }

    form(data: Record<string, string>) {
        this.apiHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
        this.apiBody = data;
        return this;
    }

    private getUrl(): string {
        const url = new URL(`${this.baseURL ?? this.defaultBaseURL}${this.apiPath}`);
        Object.entries(this.queryParams).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
        return url.toString();
    }

    async GET(statusCode: number, options?: RequestOptions) {
        const url = this.getUrl();
        let response: any;
        await test.step(`🌐 GET request to: ${url}`, async () => {
            response = await this.executeRequest('GET', statusCode, options);
        });
        return response;
    }

    async POST(statusCode: number, options?: RequestOptions) {
        const url = this.getUrl();
        let response: any;
        await test.step(`🌐 POST request to: ${url}`, async () => {
            response = await this.executeRequest('POST', statusCode, options);
        });
        return response;
    }

    async PUT(statusCode: number, options?: RequestOptions) {
        const url = this.getUrl();
        let response: any;
        await test.step(`🌐 PUT request to: ${url}`, async () => {
            response = await this.executeRequest('PUT', statusCode, options);
        });
        return response
    }

    async DELETE(statusCode: number, options?: RequestOptions) {
        const url = this.getUrl();
        let response: any;
        await test.step(`🌐 DELETE request to: ${url}`, async () => {
            response = await this.executeRequest('DELETE', statusCode, options);
        });
        return response;
    }

    private async executeRequest(method: HttpMethod, expectedStatusCode: number, options: RequestOptions = {}) {
        const { logRequestHeaders = false, logRequestBody = false, logResponseBody = false } = options;
        const url = this.getUrl();

        this.logger.logRequest(method, url, this.apiHeaders, this.apiBody, { logHeaders: logRequestHeaders, logBody: logRequestBody });

        const requestOptions: any = {
            headers: this.apiHeaders,
            maxRedirects: 0
        };

        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            if (this.apiBody instanceof FormData) {
                requestOptions.multipart = this.apiBody;
            } else if (this.isFormUrlEncoded()) {
                requestOptions.form = this.apiBody;
            } else {
                requestOptions.data = this.apiBody;
            }
        }

        const response = await this.request[method.toLowerCase() as 'get'](url, requestOptions);

        this.cleanUp();

        const actualStatusCode = response.status();
        let responseBody: any;

        try {
            responseBody = await response.json();
        } catch {
            responseBody = await response.text();
        }

        this.logger.logResponse(actualStatusCode, responseBody, { logBody: logResponseBody });
        this.validateStatusCode(actualStatusCode, expectedStatusCode, method);

        return response;
    }

    private validateStatusCode(actual: number, expected: number, method: HttpMethod) {
        if (actual !== expected) {
            const recentLogs = this.logger.getRecentLogs();
            const error = new Error(
                `[${method}] Expected status ${expected} but got ${actual}\n\n` +
                `Recent API Activity:\n${recentLogs}`
            );
            Error.captureStackTrace(error, this.validateStatusCode);
            throw error;
        }
    }

    private isFormUrlEncoded(): boolean {
        const contentType = this.apiHeaders['Content-Type'] || this.apiHeaders['content-type'];
        return contentType === 'application/x-www-form-urlencoded';
    }

    private cleanUp() {
        this.baseURL = undefined;
        this.apiPath = '';
        this.queryParams = {};
        this.apiHeaders = {};
        this.apiBody = {};
    }
}