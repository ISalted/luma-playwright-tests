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
