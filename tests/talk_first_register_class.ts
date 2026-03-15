import { test, expect } from "../test-options";

const baseUrl = 'https://campus.talkfirst.vn';
const registerClassPath = '/api/student/my-schedule/';
const expectedStatusCode = 201;
const mainClasses = {
    "firstMainClassId": '019cea05-c315-7831-a9e8-8b41da705c39', //* 19:50 - Monday, 03/16/2026
    "secondMainClassId": '019cea0c-78f5-70f1-b136-07f0e62a3843', //* 19:50 - Wednesday, 03/18/2026
    "thirdMainClassId": '019cea0e-23a9-70cc-9bc8-039737f559a4', //* 19:50 - Thursday, 03/19/2026
};
const freeTalkClassId = '019ce9fe-7fd8-78ff-8c2a-f52b91415926'; //* 19:50 - Friday, 03/20/2026
const skillClasses = {
    "firstSkillClassId": '019cea74-5a11-72f0-af66-d861fab7b5f2', //* 13:30 - Saturday, 03/21/2026
    "secondSkillClassId": '',
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

    test.skip('Register the 2nd skill class', async ({ api }) => {
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