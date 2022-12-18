import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { CONTACTS_API_URL } from "../../constants/global";
import { Contact, ContactCreate } from "../../constants/types";
import { getNameAndValue } from "../utils/dom";
import FormGroups from "./FormGroups";


export interface AddFormProps {
    addContactCallback: (contact: Contact) => void;
}


const AddForm = ({ addContactCallback }: AddFormProps) => {
    const [data, setData] = useState<ContactCreate>({} as ContactCreate);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch(CONTACTS_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => addContactCallback(data))
            .catch(err => alert(err));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = getNameAndValue(e.target);
        setData(prev => ({ ...prev, [name]: value } as ContactCreate));
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