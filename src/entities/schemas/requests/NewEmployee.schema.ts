import { z } from "zod";

export const EmpPictureSchema = z.strictObject({
    name: z.string(),
    type: z.enum(['image/jpeg']),
    size: z.number().positive(),
    base64: z.base64()
})

export const NewEmployeeSchema = z.strictObject({
    empPicture: EmpPictureSchema.nullable(),
    employeeId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    middleName: z.string()
})