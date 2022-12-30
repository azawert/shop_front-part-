import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Card, Form, Spinner} from "react-bootstrap";
import {Context} from "../index";
import {getAllBrands} from "../api/brandApi";

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const resp = await getAllBrands()
                device.setBrands(resp)
                console.log(device.brands)
            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false)
            }
        }

        fetchBrands()
    }, [])
    return (
        <Form className={'d-flex flex-wrap'}>
            {isLoading ? <Spinner/> : device.brands.map(brand => <Card key={brand.id} className={'p-3'}
                                                                       onClick={() => device.setSelectedBrand(brand)}
                                                                       style={{
                                                                           cursor: "pointer",
                                                                           marginRight: '2px',
                                                                           backgroundColor: brand.id === device.selectedBrand.id ? '#0D6EFD' : 'white',
                                                                           color: brand.id === device.selectedBrand.id ? 'white' : 'black'
                                                                       }}>{brand.name}</Card>)}
        </Form>
    );
});

export default BrandBar;
