import { TypeContact } from "./type-contact";

export interface PhoneBook {
    id?: number,
    name: string,
    phoneNumber: string,
    contactType?: TypeContact,
    comments: string,
    gender: string,
    email: string,
    contactTypeId: number,
    status?: boolean,
}
