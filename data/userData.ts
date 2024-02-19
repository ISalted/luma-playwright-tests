import { v4 as uuidv4 } from "uuid";
import { faker } from '@faker-js/faker'


export const ExistingUsersData: { email: string; pass: string } = {
    email: 'magentotestuserdan@gmail.com',
    pass: 'Ma1234567'
}

export const UserDataWithWrongEmail: { email: string; pass: string } = {
    email: 'magentotestuserdan@gmail',
    pass: 'Ma1234567'
}

export const UserDataWithWrongPass: { email: string; pass: string } = {
    email: 'magentotestuserdan@gmail.com',
    pass: '1234567'
}

export const NonExistentUserData: { email: string; pass: string } = {
    email: 'wronguserdata@gmail.com',
    pass: 'Wrong1234567'
};

export const UserDataWithUniqueEmailAndPass: { email: string; pass: string } = {
    email: `${uuidv4()}@gmail.com`,
    pass: uuidv4()
}

export const UserDataWithUniqueEmailAndPass2: { email: string; pass: string } = {
    email: `${uuidv4()}@gmail.com`,
    pass: uuidv4()
}

export const shippingAddressData = {
    firstName: 'Test',
    lastName: 'User',
    company: 'Magento',
    address: 'Pennsylvania Avenue NW',
    city: 'Washington',
    state: '12',
    zip: '20500',
    country: 'US',
    phone: '+12024561111'
}

// export const shippingAddressData = {
//     firstName: faker.person.firstName(),
//     lastName: faker.person.lastName(),
//     company: faker.company.name(),
//     address: faker.location.streetAddress(),
//     city: faker.location.city(),
//     state: faker.location.state(),
//     zip: faker.location.zipCode(),
//     country: faker.location.country(),
//     phone: faker.phone.number()
// }

