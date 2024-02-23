import { v1 as uuidv1 } from "uuid";
import { faker } from '@faker-js/faker'


export const EXISTING_USER: { email: string; pass: string, confirmPass: string } = {
    email: 'magentotestuserdan@gmail.com',
    pass: 'Ma1234567',
    confirmPass:'Ma1234567'
}

export const UNREGISTERED_USER: { email: string; pass: string } = {
    email: 'wronguserdata@gmail.com',
    pass: 'Wrong1234567',
};

export const INVALID_EMAIL: { email: string; pass: string, confirmPass: string } = {
    email: 'wronguserdata@gmail',
    pass: 'Wrong1234567',
    confirmPass: 'Wrong1234567'
};

export const DIFFERENT_PASS_USER: { email: string; pass: string, confirmPass: string } = {
    email: 'wronguserdata@gmail.com',
    pass: 'Wrong1234567',
    confirmPass: 'Wrong7654321'
};

export const INCORRECT_PASS_USER: { email: string; pass: string, confirmPass: string } = {
    email: 'magentotestuserdan@gmail.com',
    pass: '1234567',
    confirmPass: 'Ma1234567'
}

export const EMPTY_EMAIL_USER: { email: string; pass: string, confirmPass: string } = {
    email: '',
    pass: 'Ma1234567',
    confirmPass: 'Ma1234567'
};

export const EMPTY_PASS_USER: { email: string; pass: string, confirmPass: string } = {
    email: 'magentotestuserdan@gmail.com',
    pass: '',
    confirmPass: ''
};
export const UNIQUE_EMAIL_AND_PASS_USER = (): { email: string; pass: string, confirmPass: string } => {
    const uniqueId = uuidv1();
    return {
        email: `${uniqueId}@gmail.com`,
        pass: `${uniqueId}`,
        confirmPass: `${uniqueId}`
    };
};

export const WEAK_PASS_USER: { email: string; pass: string, confirmPass: string } = {
    email: 'magentotestuserdan@gmail.com',
    pass: '123',
    confirmPass: ''
}

export const MEDIUM_PASS_USER: { email: string; pass: string, confirmPass: string } = {
    email: 'magentotestuserdan@gmail.com',
    pass: 'Pass1234',
    confirmPass: ''
}

export const STRONG_PASS_USER: { email: string; pass: string, confirmPass: string } = {
    email: 'magentotestuserdan@gmail.com',
    pass: 'Pass1234!',
    confirmPass: ''
}

export const VERY_STRONG_PASS_USER: { email: string; pass: string, confirmPass: string } = {
    email: 'magentotestuserdan@gmail.com',
    pass: 'Password1234',
    confirmPass: ''
}

export const STANDART_SHIPPING_ADDRESS_DATA = {
    firstName: 'Test',
    lastName: 'User',
    company: 'Magento',
    address: 'Pennsylvania Avenue NW',
    city: 'California',
    state: '12',
    zip: '20500',
    country: 'US',
    phone: '+12024561111'
}

export const UNIQUE_SHIPPING_ADDRESS_DATA = {
    firstName: `Test ${ uuidv1() }`,
    lastName: `User ${ uuidv1() }`,
    company: `Magento ${ uuidv1() }`,
    address: `Ardess ${ uuidv1() }`,
    city: 'Washington',
    state: '62',
    zip: '20500',
    country: 'US',
    phone: '+12345678987'
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

