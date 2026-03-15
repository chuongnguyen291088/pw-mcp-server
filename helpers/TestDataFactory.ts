import { faker } from '@faker-js/faker';
import { ContactDetailsRequestDto } from '../src/requestDto/contactDetailsRequestDto';
import { NewEmployeeRequestDto } from '../src/requestDto/newEmployeeRequestDto';
import { NewUserRequestDto } from '../src/requestDto/newUserRequestDto';

export class TestDataFactory {

    static buildNewEmployeeDto(overrides: Partial<NewEmployeeRequestDto> = {}): NewEmployeeRequestDto {
        return {
            empPicture: null,
            employeeId: faker.string.numeric(8),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            middleName: faker.person.middleName(),
            ...overrides
        };
    }

    static buildNewUserDto(empNumber: number, overrides: Partial<NewUserRequestDto> = {}): NewUserRequestDto {
        return {
            username: `ndc.vn88+test${faker.string.numeric({ length: { min: 3, max: 10 } })}`,
            password: 'Welcome@01',
            status: true,
            userRoleId: 1,
            empNumber,
            ...overrides
        };
    }

    static buildContactDetailsDto(overrides: Partial<ContactDetailsRequestDto> = {}): ContactDetailsRequestDto {
        return {
            city: 'Saigon',
            countryCode: 'VN',
            homeTelephone: `849${faker.string.numeric(8)}`,
            mobile: '84934352275',
            otherEmail: faker.internet.email(),
            province: faker.location.state(),
            street1: faker.location.street(),
            street2: faker.location.secondaryAddress(),
            workEmail: `ndc.vn88+test${faker.string.numeric({ length: { min: 3, max: 10 } })}@outlook.com`,
            workTelephone: `849${faker.string.numeric(8)}`,
            zipCode: faker.location.zipCode(),
            ...overrides
        };
    }
}
