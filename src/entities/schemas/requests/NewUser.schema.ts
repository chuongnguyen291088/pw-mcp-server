import { z } from "zod";

export const NewUserRequestSchema = z.strictObject({
    username: z.string(),
    password: z.enum(['Welcome@01']),
    status: z.boolean(),
    userRoleId: z.number().min(0).max(1),
    empNumber: z.number(),
})