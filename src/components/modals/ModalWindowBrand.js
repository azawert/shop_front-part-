import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createNewBrand} from "../../api/brandApi";
import {ToastContainer} from "react-toastify";

const ModalWindowBrand = ({isShown, handleClose}) => {
    const [inputValue, setInputValue] = useState('')
    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleClickCreationBrand = async () => {
        createNewBrand({name: inputValue}).then(() => setIsSuccess(true)).catch(() => setIsError(true))
        setTimeout(() => {
            handleClose()
        }, 2500)
    }
    return (
        <Modal show={isShown} onHide={handleClose} animation={true}>
            <Modal.Header closeButton>
                <Modal.Title>Add brand</Modal.Title>
            </Modal.Header>
            <Form className={'m-1'}>
                <Form.Control placeholder={'Enter a brand name'}
                              isInvalid={inputValue.length <= 0}
                              onChange={(e) => setInputValue(e.target.value)}/>
            </Form>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="outline-secondary" onClick={handleClickCreationBrand}
                        disabled={inputValue.length <= 0}>
                    Add brand
                </Button>
            </Modal.Footer>
            {(isSuccess || isError) && <ToastContainer/>}
        </Modal>
    );
};

export default ModalWindowBrand;
