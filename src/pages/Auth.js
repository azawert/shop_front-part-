import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {login} from "../api/userApi";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';
import {Context} from "../index";

const Auth = () => {
    const {user} = useContext(Context)
    const [isHovered, setIsHovered] = useState(false)
    const [passwordValue, setPasswordValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const navigate = useNavigate()
    const handleLoginClick = async ({password, email}) => {
        try {
            const resp = await login({password, email})
            localStorage.setItem('token', resp.token)
            user.setIsAuth(true)
            setTimeout(() => {
                navigate('/')
            }, 5000)
        } catch (e) {

            alert('Неожиданная ошибка! Попробуйте позже')
        }

    }
    return (
        <Container className={'d-flex justify-content-center align-items-center'}
                   style={{height: window.innerHeight - 54}}>

            <Card style={{width: 600}} className={'p-5'}>
                <h2 className={'m-auto'}>Login</h2>
                <Form className={'d-flex flex-column'}>
                    <Form.Control placeholder={'Введите вашу почту...'} className={'mt-2'}
                                  onChange={(e) => setEmailValue(e.target.value)}
                                  value={emailValue}/>
                    <Form.Control placeholder={'Введите ваш пароль...'} className={'mt-2'}
                                  onChange={(e) => setPasswordValue(e.target.value)}
                                  value={passwordValue}
                                  type={'password'}/>
                    <Form>
                        <Button variant={'outline-dark'} className={'mt-4 align-self-start'}
                                disabled={(!emailValue || !passwordValue)}
                                onClick={() => handleLoginClick({password: passwordValue, email: emailValue})}
                        >
                            Login
                        </Button>
                        <div className={''} style={{fontSize: "small", color: 'black'}}>
                            No account? <Link to={`/registration`}
                                              style={{textDecoration: isHovered ? 'underline' : 'none'}}
                                              onMouseLeave={() => setIsHovered(false)}
                                              onMouseEnter={() => setIsHovered(true)}>
                            Go to registration form
                        </Link>
                        </div>
                    </Form>
                </Form>
            </Card>
            <ToastContainer/>
        </Container>
    );
};

export default Auth;

