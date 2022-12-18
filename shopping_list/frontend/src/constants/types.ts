export interface ProductBase {
    text: string;
    quantity?: number;
    completed?: boolean;
}

export interface Product extends ProductBase {
    id: number;
    quantity: number;
    createdDate: Date;
    completed: boolean;
}

export interface ProductCreate extends ProductBase {}

export interface ProductUpdate extends ProductBase {
    id: number;
    quantity: number;
    createdDate: Date;
    completed: boolean;
}