import { logger } from "./logger";

interface LogEntry {
    type: 'Request' | 'Response';
    timestamp: string;
    data: any;
}

interface LogOptions {
    logHeaders?: boolean;
    logBody?: boolean;
}

export class APILogger {
    private logs: LogEntry[] = [];
    private maxLogsSize: number = 50;

    logRequest(method: string, url: string, headers: Record<string, string>, body?: any, options: LogOptions = {}) {
        const { logHeaders = true, logBody = true } = options;
        const logData = { method, url, headers: logHeaders ? headers : '🔐<headers hidden>', body: logBody ? body : '🔐<body hidden>' };
        this.addLog('Request', logData);

        logger.info({
            METHOD: method,
            URL: url,
            HEADERS: logHeaders ? headers : '🔐🔐🔐',
            BODY: logBody ? body : '🔐🔐🔐'
        }, '🔼🔼🔼 Request Details 🔼🔼🔼');
    }

    logResponse(statusCode: number, body?: any, options: LogOptions = {}) {
        const { logBody = true } = options;
        const logData = { statusCode, body: logBody ? body : '🔐<body hidden>' };
        this.addLog('Response', logData);

        logger.info({
            STATUS_CODE: statusCode,
            BODY: logBody ? body : '🔐🔐🔐'
        }, '🔽🔽🔽 Response Details 🔽🔽🔽');
    }

    getRecentLogs(): string {
        return this.logs.map(log => {
            return `===== ${log.type} Details [${log.timestamp}] =====\n${JSON.stringify(log.data, null, 2)}`;
        }).join('\n' + '-'.repeat(50) + '\n\n');
    }

    clearLogs() {
        this.logs = [];
    }

    private addLog(type: 'Request' | 'Response', data: any) {
        this.logs.push({
            type,
            timestamp: new Date().toISOString(),
            data
        });

        if (this.logs.length > this.maxLogsSize) {
            this.logs.shift();
        }
    }
}