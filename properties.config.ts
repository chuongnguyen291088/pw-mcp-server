import dotenv from 'dotenv';
import path from 'path';
import { logger } from "./utils/logger";

dotenv.config({ path: path.resolve(__dirname, '.env') });

const PROCESS_ENV = process.env.TEST_ENV;
const env = PROCESS_ENV || 'dev';
logger.info('='.repeat(10) + `Starting tests on the ${env.toUpperCase()} environment` + '='.repeat(10));

const properties = {
    base_url: '',
    api_host: '',
    admin_username: '',
    admin_password: ''
}

switch (env.toUpperCase()) {
    case "QA":
        properties.base_url = 'https://opensource-demo.orangehrmlive.com';
        properties.api_host = 'https://opensource-demo.orangehrmlive.com';
        properties.admin_username = process.env.QA_ADMIN_USERNAME;
        properties.admin_password = process.env.QA_ADMIN_PASSWORD;
        break;

    case "PROD":
        properties.base_url = 'https://opensource-demo.orangehrmlive.com';
        properties.api_host = 'https://opensource-demo.orangehrmlive.com';
        properties.admin_username = process.env.PROD_ADMIN_USERNAME;
        properties.admin_password = process.env.PROD_ADMIN_PASSWORD;
        break;

    default:
        properties.base_url = 'https://opensource-demo.orangehrmlive.com';
        properties.api_host = 'https://opensource-demo.orangehrmlive.com';
        properties.admin_username = process.env.DEV_ADMIN_USERNAME;
        properties.admin_password = process.env.DEV_ADMIN_PASSWORD;
        break;
}

export { properties };