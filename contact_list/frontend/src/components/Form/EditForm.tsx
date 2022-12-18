import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { CONTACTS_API_URL } from "../../constants/global";
import { Contact, ContactUpdate } from "../../constants/types";
import { getNameAndValue } from "../utils/dom";
import FormGroups from "./FormGroups";


export interface EditFormProps {
    contact: Contact;
    updateContactCallback: (contact: Contact) => void;
}


const EditForm = ({ contact, updateContactCallback }: EditFormProps) => {
    const [data, setData] = useState<ContactUpdate>(contact);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = getNameAndValue(e.target);
        setData(prev => ({ ...prev, [name]: value } as ContactUpdate));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch(`${CONTACTS_API_URL}${contact.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => updateContactCallback(data))
            .catch(err => alert(err));
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroups
                data={data}
                handleChange={handleChange}
            />
            <Button variant="success" type="submit">
                Принять
            </Button>
        </Form>
    )
}

export default EditForm;