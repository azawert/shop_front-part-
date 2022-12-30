import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import ModalWindowType from "../components/modals/ModalWindowType";
import ModalWindowBrand from "../components/modals/ModalWindowBrand";
import ModalWindowDevice from "../components/modals/ModalWindowDevice";

const Admin = () => {
    const [isTypeShown, setIsTypeShown] = useState(false)
    const [isBrandShown, setIsBrandShown] = useState(false)
    const [isDeviceShown, setIsDeviceShown] = useState(false)
    return (
        <Container className={'mt-3 d-flex flex-column'}>
            <Button className={'mb-5'} onClick={() => setIsTypeShown(true)}>Добавить тип</Button>
            <Button className={'mb-5'} onClick={() => setIsBrandShown(true)}>Добавить бренд</Button>
            <Button onClick={() => setIsDeviceShown(true)}>Добавить устройство</Button>

            <ModalWindowType isShown={isTypeShown} handleClose={() => setIsTypeShown(false)}/>
            <ModalWindowBrand isShown={isBrandShown} handleClose={() => setIsBrandShown(false)}/>
            <ModalWindowDevice isShown={isDeviceShown} handleClose={() => setIsDeviceShown(false)}
                               setIsShown={() => setIsDeviceShown(!isDeviceShown)}/>
        </Container>
    );
};

export default Admin;
