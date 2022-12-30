import React, {useState} from 'react';
import {Pagination} from "react-bootstrap";


const PaginationPubl = ({onClick, number, total}) => {
    let items = [];
    const pages = Math.floor(total / number)
    const [active, setActive] = useState(1)
    console.log(pages)
    for (let i = 0; i <= pages; i++) {
        items.push(i)
    }
    let newItems = items.map(i => i + 1)
    if (total === 0) return

    return (
        <Pagination className={'mt-5'}>
            {newItems.map((item, i) => {
                console.log(item)
                return <Pagination.Item key={item} active={active === i + 1} onClick={() => {
                    setActive(i + 1)
                    onClick(item)
                }}>{item}</Pagination.Item>
            })}
        </Pagination>
    );
};

export default PaginationPubl;
