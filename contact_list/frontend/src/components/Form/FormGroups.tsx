import React from "react";
import { Form } from "react-bootstrap";
import { ContactBase } from "../../constants/types";


export interface FormGroups {
    data: ContactBase;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const FormGroups = ({ data, handleChange }: FormGroups) => {
    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label>Имя</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Имя"
                    name="name"
                    value={data.name || ""}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Номер телефона</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Телефон"
                    name="phone"
                    value={data.phone || ""}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Дата рождения</Form.Label>
                <Form.Control
                    type="date"
                    placeholder="Дата рождения"
                    name="birthday"
                    value={data.birthday || ""}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Компания</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Компания"
                    name="company"
                    value={data.company || ""}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Адрес</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Адрес"
                    name="address"
                    value={data.address || ""}
                    onChange={handleChange}
                />
            </Form.Group>
        </>
    )
}

export default FormGroups;