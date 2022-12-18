export interface ContactBase {
    name: string;
    phone: string;
    company: string | null;
    address: string | null;
    birthday: string | null;
}

export interface Contact extends ContactBase {
    id: number;
}

export interface ContactCreate extends ContactBase {}

export interface ContactUpdate extends ContactBase {}