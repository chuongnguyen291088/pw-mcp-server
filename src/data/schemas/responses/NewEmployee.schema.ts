import { z } from "zod";

export const data = z.strictObject({
    empNumber: z.number().positive(),
    lastName: z.string(),
    firstName: z.string(),
    middleName: z.string(),
    employeeId: z.string(),
    terminationId: z.string().nullable()
})

export const NewEmployeeResponseSchema = z.strictObject({
    data: data,
    meta: z.array(z.record(z.string(), z.unknown())).nullable(),
    rels: z.array(z.record(z.string(), z.unknown())).nullable()
})