import React from "react";
import { Form } from "react-bootstrap";
import { ProductBase, ProductUpdate } from "../../constants/types";


export interface FormGroups {
    data: ProductBase;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    allRequired?: boolean;
    isEdit?: boolean;
}


const FormGroups = ({ data, handleChange, allRequired = false, isEdit = false }: FormGroups) => {
    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label>Название</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Название"
                    name="text"
                    value={data.text || undefined}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Количество</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Количество"
                    name="quantity"
                    value={data.quantity || undefined}
                    min={1}
                    onChange={handleChange}
                />
            </Form.Group>
            {isEdit && (
                <Form.Group className="mb-3">
                    <Form.Label>Дата создания</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        placeholder="Дата создания"
                        name="createdDate"
                        value={(data as ProductUpdate).createdDate.toISOString().substring(0, 16)}
                        onChange={handleChange}
                        required={allRequired}
                    />
                </Form.Group>
            )}
            <Form.Group className="mb-3">
                <Form.Label>Выполнение</Form.Label>
                <Form.Check
                    type="switch"
                    name="completed"
                    checked={data.completed || false}
                    onChange={handleChange}
                />
            </Form.Group>
        </>
    )
}

export default FormGroups;