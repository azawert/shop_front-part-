import React, {useContext} from 'react';
import {Context} from "../../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate, Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {BASKET_ROUTE} from "../../utils/const";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const {device} = useContext(Context)
    const handleLogout = () => {
        localStorage.removeItem('token')
        user.setIsAuth(false)
    }
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Link to={`/`} style={{color: 'white', textDecoration: 'none', fontSize: 'x-large'}}
                      className={'mr-5'}>BuyDevice:)</Link>
                <Nav className="ml-auto">
                    {user.isAuth ? <><Button variant={'outline-light'} style={{marginRight: '4px'}}
                                             onClick={() => navigate(BASKET_ROUTE)}>
                        Cart
                    </Button>
                        <Button variant={'outline-light'} style={{marginRight: '4px'}}
                                onClick={() => navigate('/admin')}>
                            Admin panel
                        </Button>
                        <Button variant={'outline-light'} onClick={handleLogout}>
                            Logout
                        </Button>
                    </> : <><Button variant={'outline-light'} onClick={() => navigate('/login')}>
                        Login
                    </Button>
                        <Button variant={'outline-light'} onClick={() => {
                            navigate('/')

                        }}
                                style={{marginLeft: '4px'}}>
                            Main page
                        </Button></>}

                </Nav>
            </Container>
        </Navbar>
    );
});

export default NavBar;
