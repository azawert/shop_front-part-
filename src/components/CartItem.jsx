import React, {useContext} from 'react';
import {Badge, Card, Image} from "react-bootstrap";
import {observer} from "mobx-react";
import {Context} from "../index";

const CartItem = observer(({item}) => {
    const {cart} = useContext(Context)
    const {quantity, name, id, price, img} = item


    return (
        <Card style={{width:'25%',display:'flex',justifyContent:'center',marginRight:'15px'}} className={'p-2'}>
            <span style={{textAlign:'center'}}>{name}</span>
            <Image src={`http://localhost:5432/${img}`} style={{width: 250,margin:'0 auto'}} height={150}/>
            <div className={'d-flex justify-content-center'}>
                <Badge style={{ cursor: 'pointer'}} onClick={() => cart.setAddQuantity(id)}>+</Badge>
                <span>Quantity: {quantity}</span>
                <Badge style={{ cursor: 'pointer'}} onClick={() => cart.setRemoveQuantity(id)}>-</Badge>
            </div>

        </Card>
    );
});

export default CartItem;
