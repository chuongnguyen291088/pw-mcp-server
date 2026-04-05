import { NewUserRequestSchema } from "@entities/schemas/requests/NewUser.schema";
import { faker } from "@faker-js/faker";
import { z } from "zod";

type NewUserPayload = z.infer<typeof NewUserRequestSchema>;

export const prepareNewUserPayload = (overrides?: Partial<NewUserPayload>): NewUserPayload => {
    const defaultData: NewUserPayload = {
        username: `ndcvn88_test${faker.string.numeric({ length: { min: 4, max: 8 } })}`,
        password: 'Welcome@01',
        status: true,
        userRoleId: 1,
        empNumber: Number(faker.string.numeric(3))
    }

    return NewUserRequestSchema.parse({ ...defaultData, ...overrides })
}