import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row, Spinner} from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import {getAllDevices} from "../api/deviceApi";
import DropdownNumber from "./Dropdown";
import PaginationPubl from "./Pagination";


const DeviceList = observer(() => {
    const {device} = useContext(Context)
    const [loading, setLoading] = useState(true)
    const [number, setNumber] = useState(5)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(null)
    useEffect(() => {
        let brandId = device.selectedBrand.id | null;
        let typeId = device.selectedType.id | null;
        (!brandId && !typeId) ? getAllDevices(null, null, number, page).then(resp => {
            device.setDevices(resp.rows)
            if (resp.count === 0) return setTotal(0)
            setTotal(resp.count)
        }).finally(() => setLoading(false)) : getAllDevices(brandId ? brandId : null, typeId ? typeId : null, number ? number : null).then(resp => {
            device.setDevices(resp.rows)
            if (resp.count === 0) return setTotal(0)
            setTotal(resp.count)
        }).finally(() => setLoading(false))
    }, [device.selectedBrand, device.selectedType, number, page])
    return (
        <>
            <Row className={'mt-5'}>
                {loading ? <Spinner/> : device.devices.length === 0 ?
                    <Row>No items found :(</Row> : device.devices.map(device => <DeviceItem key={device.id}
                                                                                            device={device}/>)}
            </Row>
            <DropdownNumber setNumber={setNumber} number={number}/>
            <PaginationPubl number={number} onClick={setPage} total={total}/>
        </>
    );
});

export default DeviceList;
