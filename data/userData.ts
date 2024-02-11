import { v4 as uuidv4 } from "uuid";

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


