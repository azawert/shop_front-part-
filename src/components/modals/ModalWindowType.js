import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import {createNewType} from "../../api/typeApi";
import {ToastContainer} from "react-toastify";

const ModalWindowType = ({isShown, handleClose}) => {
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const handleCreateClick = () => {
        setIsLoading(true)
        createNewType({name: inputValue}).then(() => {
            setIsSuccess(true)
            setTimeout(() => {
                handleClose()
            }, 2500)
        }).catch(e => alert(e)).finally(() => setIsLoading(false))

    }
    return (
        <Modal show={isShown} onHide={handleClose} animation={true}>
            <Modal.Header closeButton>
                <Modal.Title>Add type</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control isInvalid={inputValue.length <= 0} placeholder={'Enter type name'} value={inputValue}
                                  onChange={(e) => setInputValue(e.target.value)}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="outline-secondary" onClick={handleCreateClick}
                        disabled={inputValue.length <= 0 || isLoading}>
                    {isLoading ? 'Loading...' : 'Add type'}
                </Button>
            </Modal.Footer>
            {isSuccess && <ToastContainer/>}
        </Modal>
    );
};

export default ModalWindowType;
