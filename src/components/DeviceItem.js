import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Spinner} from "react-bootstrap";
import {AiFillStar} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/const";
import {getSingleBrand} from "../api/brandApi";
import {Context} from "../index";
import {observer} from "mobx-react";


const DeviceItem = observer(({device}) => {
    const navigate = useNavigate()
    const {user, cart} = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)
    const [brandName, setBrandName] = useState('')
    useEffect(() => {
        const getSingleBrandForCard = async () => {
            const resp = await getSingleBrand(device.brandId)
            setBrandName(resp.name)
            setIsLoading(false)
        }

        getSingleBrandForCard()
    }, [])
    const isInCart = cart.cartItems.some(item => item.id === device.id)

    return (
        <Col md={3}>
            <Card className={'mt-2'}>
                <Card style={{width: '220px', marginTop: '5px', cursor: 'pointer', border: 'none'}}
                      onClick={() => navigate(`${DEVICE_ROUTE}${device.id}`)}>
                    <Card.Img variant="top" src={`http://localhost:5432/${device.img}`} width={120} height={220}/>
                    <Card.Body className={'d-flex justify-content-between align-items-center'}>
                        <div className={'d-flex justify-content-between align-items-center w-100'}>
                            {isLoading ? <Spinner/> :
                                <Card.Subtitle
                                    style={{color: 'grey'}}>{brandName ? brandName : 'Brand'}</Card.Subtitle>}
                            <div>
                                <span>{device.rating}</span>
                                <i><AiFillStar fill={'yellow'}/></i>
                            </div>
                        </div>

                    </Card.Body>
                    <Card.Title className={'ml-15'} style={{marginLeft: '15px'}}>{device.name}</Card.Title>
                </Card>
                <Button variant="outline-primary" className={'mb-5'}
                        style={{width: '50%', display: 'flex', justifySelf: 'center', alignSelf: 'center'}}
                        disabled={!user.isAuth} onClick={
                    isInCart ? () => cart.setDeleteItem(device.id) : () => {
                        cart.setCartItems({...device, quantity: 1})
                    }}>{user.isAuth ? isInCart ? 'Remove from cart' : 'Add to cart' : 'Not logged'}</Button>
            </Card>
        </Col>
    );
});

export default DeviceItem;
