import React from 'react';
import { MDBContainer, MDBRating } from 'mdbreact';

const RatingPage = () => {
    return (
        <MDBContainer>
            <MDBRating
                iconFaces
                fillClassName='black-text'
                iconRegular
            />
        </MDBContainer>
    );
};

export default RatingPage;