import { test, expect } from "../test-options";

const baseUrl = 'https://campus.talkfirst.vn';
const registerClassPath = '/api/student/my-schedule/';
const expectedStatusCode = 201;
const mainClasses = {
    "firstMainClassId": '019d0fdf-2daa-7701-ac6b-460bf99ccf26', //* 19:50 - Tuesday, 03/24/2026
    "secondMainClassId": '019d0feb-68c5-7251-b97b-6a7ed2b79c53', //* 19:50 - Wednesday, 03/25/2026
    "thirdMainClassId": '019d0fe2-179e-7b60-99d4-76e54b16b293', //* 19:50 - Thursday, 03/26/2026
};
const freeTalkClassId = '019d0fc9-643c-7f6e-838d-504afc4d1fcb'; //* 19:50 - Saturday, 03/28/2026
const skillClasses = {
    "firstSkillClassId": '019d1030-75e6-74c5-90e9-0bc0af1ff1c2', //* 13:30 - Saturday, 03/21/2026
    "secondSkillClassId": '019d102b-230b-7f61-8e36-572868f1994a',
    "thirdSkillClassId": '',
};

test.describe('Register Talk First English Class', () => {
    test('Register the 1st main class', async ({ api }) => {
        await api
            .url(baseUrl)
            .path(registerClassPath)
            .headers({
                "Authorization": `Bearer ${process.env.TF_ACCESS_TOKEN}`
            })
            .body({
                "flexibleClassScheduleId": mainClasses.firstMainClassId
            })
            .POST(expectedStatusCode, { logRequestHeaders: true, logRequestBody: true, logResponseBody: true })
    });

    test('Register the 2nd main class', async ({ api }) => {
        await api
            .url(baseUrl)
            .path(registerClassPath)
            .headers({
                "Authorization": `Bearer ${process.env.TF_ACCESS_TOKEN}`
            })
            .body({
                "flexibleClassScheduleId": mainClasses.secondMainClassId
            })
            .POST(expectedStatusCode, { logRequestHeaders: true, logRequestBody: true, logResponseBody: true })
    });

    test('Register the 3rd main class', async ({ api }) => {
        await api
            .url(baseUrl)
            .path(registerClassPath)
            .headers({
                "Authorization": `Bearer ${process.env.TF_ACCESS_TOKEN}`
            })
            .body({
                "flexibleClassScheduleId": mainClasses.thirdMainClassId
            })
            .POST(expectedStatusCode, { logRequestHeaders: true, logRequestBody: true, logResponseBody: true })
    });

    test('Register the free talk class', async ({ api }) => {
        await api
            .url(baseUrl)
            .path(registerClassPath)
            .headers({
                "Authorization": `Bearer ${process.env.TF_ACCESS_TOKEN}`
            })
            .body({
                "flexibleClassScheduleId": freeTalkClassId
            })
            .POST(expectedStatusCode, { logRequestHeaders: true, logRequestBody: true, logResponseBody: true })
    });

    test('Register the 1st skill class', async ({ api }) => {
        await api
            .url(baseUrl)
            .path(registerClassPath)
            .headers({
                "Authorization": `Bearer ${process.env.TF_ACCESS_TOKEN}`
            })
            .body({
                "flexibleClassScheduleId": skillClasses.firstSkillClassId
            })
            .POST(expectedStatusCode, { logRequestHeaders: true, logRequestBody: true, logResponseBody: true })
    });

    test('Register the 2nd skill class', async ({ api }) => {
        await api
            .url(baseUrl)
            .path(registerClassPath)
            .headers({
                "Authorization": `Bearer ${process.env.TF_ACCESS_TOKEN}`
            })
            .body({
                "flexibleClassScheduleId": skillClasses.secondSkillClassId
            })
            .POST(expectedStatusCode, { logRequestHeaders: true, logRequestBody: true, logResponseBody: true })
    });

    test.skip('Register the 3rd skill class', async ({ api }) => {
        await api
            .url(baseUrl)
            .path(registerClassPath)
            .headers({
                "Authorization": `Bearer ${process.env.TF_ACCESS_TOKEN}`
            })
            .body({
                "flexibleClassScheduleId": skillClasses.thirdSkillClassId
            })
            .POST(expectedStatusCode, { logRequestHeaders: true, logRequestBody: true, logResponseBody: true })
    });
});