import { z } from "zod";

export const EmpPictureRequestSchema = z.strictObject({
    name: z.string(),
    type: z.enum(['image/jpeg']),
    size: z.number().positive(),
    base64: z.base64()
})

export const NewEmployeeRequestSchema = z.strictObject({
    empPicture: EmpPictureRequestSchema.nullable(),
    employeeId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    middleName: z.string()
})