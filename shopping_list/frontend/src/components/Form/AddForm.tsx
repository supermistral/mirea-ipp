import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Product, ProductCreate } from "../../constants/types";
import ClientContext from "../../context/CllientContext";
import { getNameAndValue } from "../utils/dom";
import FormGroups from "./FormGroups";


export interface AddFormProps {
    addProductCallback: (product: Product) => void;
}


const AddForm = ({ addProductCallback }: AddFormProps) => {
    const client = useContext(ClientContext);

    const [data, setData] = useState<ProductCreate>({} as ProductCreate);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        client.Add(data)
            .then(data => addProductCallback(data as Product))
            .catch(e => alert(e));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = getNameAndValue(e.target);
        setData(prev => ({ ...prev, [name]: value } as ProductCreate));
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroups
                data={data}
                handleChange={handleChange}
            />
            <Button variant="success" type="submit">
                Добавить
            </Button>
        </Form>
    )
}

export default AddForm;