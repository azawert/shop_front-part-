import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup, Spinner} from "react-bootstrap";
import {getAllTypes} from "../api/typeApi";


const TypeBar = observer(() => {
    const {device} = useContext(Context)
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        getAllTypes().then(({type})=>device.setTypes(type)).finally(()=>setLoading(false))
    },[])
    return (
        <ListGroup>
            {loading?<Spinner/>:device?.types.map((type, idx) => <ListGroup.Item key={type.id}
                                                              onClick={() => device.setSelectedType(type)}
                                                              active={type.id === device.selectedType.id}
                                                              style={{cursor: "pointer"}}>{type.name}</ListGroup.Item>)}
        </ListGroup>
    );
});

export default TypeBar;
