import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import { CONTACTS_API_URL } from "../../constants/global";
import { Contact } from "../../constants/types";
import AddForm from "../Form/AddForm";
import ContactRow from "./ContactRow";


const ContactList = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const firstRender = useRef<{ render: boolean, request: boolean }>({
        render: true,
        request: false
    });

    useEffect(() => {
        console.log("123123")
        fetch(CONTACTS_API_URL)
            .then(res => res.json())
            .then(data => {
                firstRender.current.request = true;
                setContacts(data);
            })
            .catch(err => alert(err));
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
    }, [contacts]);

    const updateContact = (contact: Contact) => setContacts(prev =>
        prev.map(item => item.id === contact.id ? contact : item)
    );
    const addContact = (contact: Contact) => setContacts(prev => [...prev, contact]);
    const deleteContact = (contact: Contact) => setContacts(prev =>
        prev.filter(item => item.id !== contact.id)
    )

    return (
        <>
            <div className="table-title">
                <div className="row">
                    <div className="col sm-6">
                        <h2>Контакты</h2>
                    </div>
                    <div className="col sm-6">
                        <Button onClick={handleAddClick} className="btn btn-success" data-toggle="modal">
                            <i className="material-icons">&#xE147;</i> <span>Создать контакт</span>
                        </Button>
                    </div>
                </div>
            </div>

            <Alert show={showAlert} variant="success">
                Список контактов обновлен
            </Alert>

            <table className="table">
                <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Телефон</th>
                        <th>Дата рождения</th>
                        <th>Компания</th>
                        <th>Адрес</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(contact => (
                        <tr key={contact.id}>
                            <ContactRow
                                contact={contact}
                                updateContactCallback={updateContact}
                                deleteContactCallback={deleteContact}
                            />
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={showEdit} onHide={handleCloseClick}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить контакт</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddForm addContactCallback={addContact} />
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

export default ContactList;