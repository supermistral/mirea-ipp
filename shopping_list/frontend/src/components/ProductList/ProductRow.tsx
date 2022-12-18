import React, { useState, useEffect, useContext } from "react";
import { Button, OverlayTrigger, Tooltip, Modal, Form } from "react-bootstrap";
import { Product, ProductUpdate } from "../../constants/types";
import ClientContext from "../../context/CllientContext";
import EditForm from "../Form/EditForm";


export interface ProductProps {
    product: Product;
    updateProductCallback: (product: Product) => void;
    deleteProductCallback: (product: Product) => void;
}


const ProductRow = ({ product, updateProductCallback, deleteProductCallback }: ProductProps) => {
    const client = useContext(ClientContext);
    
    const [show, setShow] = useState<boolean>(false);

    const handleEditClick = () => setShow(true);
    const handleCloseClick = () => setShow(false);

    const updateProduct = (product: Product) => {
        updateProductCallback(product);
        handleCloseClick();
    }

    const deleteProduct = () => {
        client.Delete({ id: product.id })
            .then(() => {
                handleCloseClick();
                deleteProductCallback(product);
            })
            .catch(e => alert(e));
    }

    const updateProductCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
        client.Update({ ...product, completed: e.target.checked })
            .then(data => updateProduct(data as Product))
            .catch(e => alert(e));
    }

    return (
        <>
            <td>{product.text}</td>
            <td>{product.quantity}</td>
            <td>{product.createdDate.toISOString()}</td>
            <td>
                <Form.Group>
                    <Form.Check
                        type="switch"
                        name="completed"
                        checked={product.completed}
                        onChange={updateProductCompleted}
                    />
                </Form.Group>
            </td>
            <td className="actions">
                <OverlayTrigger overlay={
                    <Tooltip id={'tooldtip-edit'}>Изменить</Tooltip>
                }>
                    <Button onClick={handleEditClick} className="btn btn-act text-warning" data-toggle="modal">
                        <i className="material-icons">&#xE254;</i>
                    </Button>    
                </OverlayTrigger>
                <OverlayTrigger overlay={
                    <Tooltip id={'tooldtip-edit'}>Удалить</Tooltip>
                }>
                    <Button onClick={deleteProduct} className="btn btn-act text-danger" data-toggle="modal">
                        <i className="material-icons">&#xE872;</i>
                    </Button>    
                </OverlayTrigger>
            </td>

            <Modal show={show} onHide={handleCloseClick}>
                <Modal.Header closeButton>
                    Редактировать покупку
                </Modal.Header>
                <Modal.Body>
                    <EditForm product={product} updateProductCallback={updateProduct} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseClick}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProductRow;