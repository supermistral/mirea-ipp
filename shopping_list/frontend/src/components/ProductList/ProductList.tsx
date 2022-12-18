import React, { useState, useEffect, useRef, useContext } from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import { Product } from "../../constants/types";
import ClientContext from "../../context/CllientContext";
import AddForm from "../Form/AddForm";
import ProductRow from "./ProductRow";


const ProductList = () => {
    const client = useContext(ClientContext);

    const [products, setProducts] = useState<Product[]>([]);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const firstRender = useRef<{ render: boolean, request: boolean }>({
        render: true,
        request: false
    });

    useEffect(() => {
        client.GetAll({})
            .then(data => {
                setProducts(data.products as Product[]);
                firstRender.current.request = true;
            })
            .catch(e => alert(e));
    }, []);

    const handleAddClick = () => setShowEdit(true);
    const handleCloseClick = () => setShowEdit(false);

    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
    }

    useEffect(() => {
        if (firstRender.current.request) {
            if (!firstRender.current.render) {
                handleCloseClick();
                return () => handleShowAlert();
            }
            firstRender.current.render = false;
        }
    }, [products]);

    const updateProduct = (product: Product) => setProducts(prev =>
        prev.map(item => item.id === product.id ? product : item)
    );
    const addProduct = (product: Product) => setProducts(prev => [...prev, product]);
    const deleteProduct = (product: Product) => setProducts(prev =>
        prev.filter(item => item.id !== product.id)
    );

    return (
        <>
            <div className="table-title">
                <div className="row">
                    <div className="col sm-6">
                        <h2>Покупки</h2>
                    </div>
                    <div className="col sm-6">
                        <Button onClick={handleAddClick} className="btn btn-success" data-toggle="modal">
                            <i className="material-icons">&#xE147;</i> <span>Создать покупку</span>
                        </Button>
                    </div>
                </div>
            </div>

            <Alert show={showAlert} variant="success">
                Список покупок обновлен
            </Alert>

            <table className="table">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Количество</th>
                        <th>Дата создания</th>
                        <th>Выполнение</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <ProductRow
                                product={product}
                                updateProductCallback={updateProduct}
                                deleteProductCallback={deleteProduct}
                            />
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={showEdit} onHide={handleCloseClick}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить покупку</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddForm addProductCallback={addProduct} />
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

export default ProductList;