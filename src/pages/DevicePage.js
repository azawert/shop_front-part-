import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Image, Spinner} from "react-bootstrap";
import starImage from '../assets/Star.png'
import {useParams} from "react-router-dom";
import {getSingleDevice, updateRating} from "../api/deviceApi";
import {Rating} from 'react-simple-star-rating'

const DevicePage = () => {
    const {id} = useParams()
    const [device, setDevice] = useState(null)
    const [rating,setRating] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        getSingleDevice(id).then((resp) => setDevice(resp)).catch((e) => alert(e)).finally(() => setIsLoading(false))
    }, [])
    const handleSetRating = (data) => {
        updateRating(data).then(resp=>setRating(resp.device.rating))
    }

    return (
        isLoading ? <Spinner/> : <Container className={'mt-3 d-flex flex-wrap'}>
            <Col md={4}>
                <Image src={`http://localhost:5432/${device.img}`} width={302} height={333}/>
            </Col>
            <Col md={4}>
                <Form className={'d-flex flex-column align-items-center'}>
                    <h2>{device.name}</h2>
                    <div className={'d-flex align-items-center justify-content-center'} style={{
                        background: `url(${starImage}) no-repeat center center`,
                        width: 240,
                        height: 240,
                        backgroundSize: 'cover'
                    }}>
                        {rating ? rating : device.rating}
                    </div>
                </Form>
            </Col>
            <Col md={4}>
                <Card style={{
                    height: '100%',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: '300',
                    border: '2px solid grey'
                }}>
                    <h3>Цена от {device.price} руб.</h3>
                    <Button variant={'outline-secondary'}>Add to cart</Button>
                </Card>
            </Col>
            <div className={'w-100'}>
                <h1>Характеристики</h1>
                {device.info?.map((i, index) => {
                    return <Col key={i.id} className={'d-flex w-100'}
                                style={{backgroundColor: index % 2 === 0 ? 'lightgrey' : 'transparent', padding: 15}}>
                        {i.title}:{i.description}
                    </Col>
                })}
            </div>
            <Rating
                initialValue={device.rating}
                size={20}
                label={true}
                transition
                fillColor='orange'
                emptyColor='gray'
                className='foo' // Will remove the inline style if applied
                onClick={(value)=>handleSetRating({deviceId:device.id,rating:value})}
            />


        </Container>
    )
        ;
};

export default DevicePage;
