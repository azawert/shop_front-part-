import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createNewDevice} from "../../api/deviceApi";
import {ToastContainer} from "react-toastify";
import {getAllBrands} from "../../api/brandApi";
import {getAllTypes} from "../../api/typeApi";
import {observer} from "mobx-react-lite";

const ModalWindowDevice = observer(({isShown, handleClose}) => {
    const {device} = useContext(Context)
    const [info, setInfo] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [brand, setBrand] = useState(null)
    const [type, setType] = useState(null)
    const [file, setFile] = useState(null)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {

        getAllBrands().then(resp => device.setBrands(resp))
        getAllTypes().then(resp => device.setTypes(resp.type))
        console.log(device.brands.map(brand => brand.name))
    }, [isShown])
    const addNewInfo = () => {
        setInfo((prev) => [...prev, {title: '', description: '', number: Date.now()}])
    }
    const deleteInfo = (number) => {
        setInfo((prev) => [...prev].filter(el => el.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map((i) => Number(i.number) === Number(number) ?
            {...i, [key]: value} : i
        ))
    }
    const handleClickCreateNewDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', String(price))
        formData.append('img', file)
        formData.append('brandId', brand.id)
        formData.append('typeId', type.id)
        formData.append('info', JSON.stringify(info))
        createNewDevice(formData).then(() => setIsSuccess(true)).then(() => {
            setTimeout(() => {
                handleClose()
            }, 2500)
        }).catch(() => setIsError(true))
    }

    return (
        <Modal show={isShown} onHide={handleClose} animation={true}>
            <Modal.Header closeButton>
                <Modal.Title>Add device</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className={'mb-3'}>
                    <Dropdown.Toggle>{type ? type.name : 'Выберите тип'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.types && device.types.map(type => <Dropdown.Item onClick={() => setType(type)}
                                                                                 key={type.id}>{type.name}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className={'mb-3'}>
                    <Dropdown.Toggle>{brand ? brand.name : 'Выберите бренд'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.brands.map(brand => <Dropdown.Item onClick={() => setBrand(brand)}
                                                                   key={brand.id}>{brand.name}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
                <Form>
                    <Form.Control placeholder={'Введите название устройства'} className={'mb-3'}
                                  onChange={(e) => setName(e.target.value)}
                                  value={name}/>
                    <Form.Control placeholder={'Введите цену устройства'} className={'mb-3'}
                                  onChange={(e) => setPrice(Number(e.target.value))}
                                  value={price}/>
                    <Form.Control type={'file'} onChange={(e) => {
                        setFile(e.target.files[0])
                        console.log(e.target.files[0].name)
                    }}/>
                    <hr/>
                    <Button onClick={addNewInfo} variant={"outline-secondary"}>
                        Добавить характеристику
                    </Button>
                    {info.map(i => <Row className={'mt-5'} key={i.number}>
                        <Col md={4}>
                            <Form.Control placeholder={'Введите заголовок характеристики'}
                                          onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                          value={i.title}/>
                        </Col>
                        <Col md={4}>
                            <Form.Control placeholder={'Введите описание характеристики'} value={i.description}
                                          onChange={(e) => changeInfo('description', e.target.value, i.number)}
                            />
                        </Col>
                        <Button variant={"outline-danger"} style={{width: '33%'}}
                                onClick={() => deleteInfo(i.number)}>Удалить</Button>
                    </Row>)}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="outline-secondary" onClick={handleClickCreateNewDevice}>
                    Add device
                </Button>
            </Modal.Footer>
            {(isSuccess || isError) && <ToastContainer/>}
        </Modal>
    );
});

export default ModalWindowDevice;
