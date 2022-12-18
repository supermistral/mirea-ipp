import { useState, useEffect } from "react";
import { Button, OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import { CONTACTS_API_URL } from "../../constants/global";
import { Contact, ContactUpdate } from "../../constants/types";
import EditForm from "../Form/EditForm";


export interface ContactProps {
    contact: Contact;
    updateContactCallback: (contact: Contact) => void;
    deleteContactCallback: (contact: Contact) => void;
}


const ContactRow = ({ contact, updateContactCallback, deleteContactCallback }: ContactProps) => {
    const [show, setShow] = useState<boolean>(false);

    const handleEditClick = () => setShow(true);
    const handleCloseClick = () => setShow(false);

    const updateContact = (contactUpdate: ContactUpdate) => {
        fetch(`${CONTACTS_API_URL}${contact.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactUpdate)
        })
            .then(res => res.json())
            .then(data => {
                handleCloseClick();
                updateContactCallback(data)
            })
            .catch(err => alert(err));
    }

    const deleteContact = () => {
        fetch(`${CONTACTS_API_URL}${contact.id}/`, {
            method: 'DELETE',
        })
            .then(() => {
                handleCloseClick();
                deleteContactCallback(contact);
            })
            .catch(err => alert(err));
    }

    return (
        <>
            <td>{contact.name}</td>
            <td>{contact.phone}</td>
            <td>{contact.birthday}</td>
            <td>{contact.company}</td>
            <td>{contact.address}</td>
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
                    <Button onClick={deleteContact} className="btn btn-act text-danger" data-toggle="modal">
                        <i className="material-icons">&#xE872;</i>
                    </Button>    
                </OverlayTrigger>
            </td>

            <Modal show={show} onHide={handleCloseClick}>
                <Modal.Header closeButton>
                    Редактировать контакт
                </Modal.Header>
                <Modal.Body>
                    <EditForm contact={contact} updateContactCallback={updateContact} />
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

export default ContactRow;