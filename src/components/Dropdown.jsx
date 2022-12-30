import React, {useState} from 'react';
import {Dropdown} from "react-bootstrap";

const DropdownNumber = ({number, setNumber}) => {
    return (

        <Dropdown className={'mt-5'}>
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                {number ? `${number}` : `Select number of items`}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
                {[5, 10, 15, 20].map(item => <Dropdown.Item onClick={() => setNumber(item)}>{item}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>

    );
};

export default DropdownNumber;
