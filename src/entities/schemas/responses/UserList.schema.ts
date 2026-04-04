import { z } from "zod";

export const data = z.strictObject({
    id: z.number().nonnegative(),
    userName: z.string(),
    deleted: z.boolean(),
    status: z.boolean(),
    employee: z.strictObject({
        empNumber: z.number().positive(),
        employeeId: z.string(),
        firstName: z.string(),
        middleName: z.string(),
        lastName: z.string(),
        terminationId: z.string().nullable()
    }),
    userRole: z.strictObject({
        id: z.number().nonnegative(),
        name: z.string(),
        displayName: z.string()
    })
})

export const UserListResponseSchema = z.strictObject({
    data: z.array(data),
    meta: z.strictObject({
        total: z.number().nonnegative()
    }),
    rels: z.array(z.record(z.string(), z.unknown())).nullable()
})