import { z } from "zod";

export const ContactDetailsRequestSchema = z.strictObject({
    city: z.enum(['Saigon', 'Hanoi']),
    countryCode: z.literal('VN'),
    homeTelephone: z.string().max(11),
    mobile: z.literal('84934352275'),
    otherEmail: z.email(),
    province: z.string(),
    street1: z.string(),
    street2: z.string(),
    workEmail: z.email(),
    workTelephone: z.string().max(11),
    zipCode: z.string()
})