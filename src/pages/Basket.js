import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {Context} from "../index";
import {Button, Container, Row} from "react-bootstrap";
import CartItem from "../components/CartItem";

const Basket = observer(() => {
    const {cart} = useContext(Context)
    return (
        <Container>
            <div className={'d-flex justify-content-between mt-1'}>
                <Row style={{fontSize: 'large', fontWeight: 'bold'}}>
                    Shopping cart
                </Row>
                <Button style={{textDecoration: 'underline'}} onClick={() => cart.setClearCart()}>Clear all</Button>
            </div>
            <div className={'d-flex'}>
                {cart.cartItems.map(item => <CartItem item={item}/>)}
            </div>
            <span style={{
                color: 'lightgray',
                fontSize: 'small',
                fontWeight: 'bold'
            }}>Total items: {cart.cartItems.reduce((a, b) => a + b.quantity, 0)}</span>
            <br/>
            <span style={{
                color: 'lightgray',
                fontSize: 'small',
                fontWeight: 'bold'
            }}>Total price: {cart.cartItems.reduce((a, b) => (a + b.price) * b.quantity, 0)} руб.</span>
        </Container>
    );
});

export default Basket;
