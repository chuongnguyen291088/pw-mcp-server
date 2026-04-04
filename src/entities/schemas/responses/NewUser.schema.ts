import { z } from "zod";
import { NewEmployeeResponseSchema } from "./NewEmployee.schema";

export const userRole = z.strictObject({
    id: z.number().min(0).max(1),
    name: z.string(),
    displayName: z.string()
})

export const data = z.strictObject({
    id: z.number().positive(),
    userName: z.string(),
    deleted: z.boolean(),
    status: z.boolean(),
    employee: NewEmployeeResponseSchema,
    userRole: userRole
})

export const NewUserResponseSchema = z.strictObject({
    data: data,
    meta: z.array(z.record(z.string(), z.unknown())).nullable(),
    rels: z.array(z.record(z.string(), z.unknown())).nullable()
})