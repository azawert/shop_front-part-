import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {registration} from "../api/userApi";
import {Context} from "../index";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';

const Registration = () => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [isHovered, setIsHovered] = useState(false)
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const handleSubmit = async (data) => {
        try {
            const resp = await registration(data)
            if (resp) {
                user.setIsAuth(true)
                localStorage.setItem('token', resp.token)
                setIsSuccess(true)
                toast.success('Successfully registered :) You can wait 5 seconds or you can click on logo to go to main page', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setTimeout(() => {
                    navigate('/')
                }, 5000)
            }
        } catch (e) {
            alert('Something went wrong :(')
            console.log(e.message ? e.message : e)
        }

    }
    return (
        <Container className={'d-flex justify-content-center align-items-center'}
                   style={{height: window.innerHeight - 54}}>

            <Card style={{width: 600}} className={'p-5'}>
                <h2 className={'m-auto'}>Registration</h2>
                <Form className={'d-flex flex-column'}
                >
                    <Form.Control placeholder={'Введите вашу почту...'} className={'mt-2'} isInvalid={!emailValue}
                                  onChange={(e) => setEmailValue(e.target.value)} value={emailValue}

                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter an email.
                    </Form.Control.Feedback>
                    <Form.Control placeholder={'Введите ваш пароль...'} className={'mt-2'} isInvalid={!passwordValue}
                                  type='password'
                                  onChange={(e) => setPasswordValue(e.target.value)} value={passwordValue}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter an password
                    </Form.Control.Feedback>
                    <Button variant={'outline-dark'} className={'mt-4 align-self-start'}
                            onClick={() => handleSubmit({email: emailValue, password: passwordValue, role: 'ADMIN'})}
                            disabled={(!emailValue || !passwordValue)}

                    >
                        Registration
                    </Button>
                    <Form>

                        <div className={''} style={{fontSize: "small", color: 'black'}}>
                            Already have an account? <Link to={`/login`}
                                                           style={{textDecoration: isHovered ? 'underline' : 'none'}}
                                                           onMouseLeave={() => setIsHovered(false)}
                                                           onMouseEnter={() => setIsHovered(true)}>
                            Go to login form
                        </Link>
                        </div>
                    </Form>
                </Form>
            </Card>
            {isSuccess && <ToastContainer/>}
        </Container>
    );
};

export default Registration;
