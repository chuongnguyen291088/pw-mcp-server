import { z } from "zod";
import { faker } from "@faker-js/faker";
import { ContactDetailsRequestSchema } from "@entities/schemas/requests/ContactDetails.schema";

type ContactDetailsPayload = z.infer<typeof ContactDetailsRequestSchema>

export const prepareContactDetailsPayload = (override?: Partial<ContactDetailsPayload>): ContactDetailsPayload => {
    const defaultData: ContactDetailsPayload = {
        city: faker.helpers.arrayElement(['Saigon', 'Hanoi']),
        countryCode: 'VN',
        homeTelephone: `849${faker.string.numeric(8)}`,
        mobile: '84934352275',
        otherEmail: faker.internet.email().toLowerCase(),
        province: faker.location.state(),
        street1: faker.location.streetAddress(),
        street2: faker.location.secondaryAddress(),
        workEmail: `ndc.vn88+test${faker.string.numeric({ length: { min: 3, max: 10 } })}@outlook.com`,
        workTelephone: `849${faker.string.numeric(8)}`,
        zipCode: faker.location.zipCode()
    }

    return ContactDetailsRequestSchema.parse({ ...defaultData, ...override })
}