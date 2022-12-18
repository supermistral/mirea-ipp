import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Product, ProductUpdate } from "../../constants/types";
import ClientContext from "../../context/CllientContext";
import { getNameAndValue } from "../utils/dom";
import FormGroups from "./FormGroups";


export interface EditFormProps {
    product: Product;
    updateProductCallback: (product: Product) => void;
}


const EditForm = ({ product, updateProductCallback }: EditFormProps) => {
    const client = useContext(ClientContext);

    const [data, setData] = useState<ProductUpdate>(product);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = getNameAndValue(e.target);
        setData(prev => ({ ...prev, [name]: value } as ProductUpdate));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        client.Update(data)
            .then(data => updateProductCallback(data as Product))
            .catch(e => alert(e));
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroups
                data={data}
                handleChange={handleChange}
                allRequired={true}
                isEdit={true}
            />
            <Button variant="success" type="submit">
                Принять
            </Button>
        </Form>
    )
}

export default EditForm;