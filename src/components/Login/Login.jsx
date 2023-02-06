import React from 'react'
import './style.scss'
import { Button } from 'react-bootstrap'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form';
import { NavLink } from 'react-router-dom'
import { useContext } from 'react';
import { NewContext } from '../../Context/Context';


const Login = () => {

    const { login } = useContext(NewContext);

    return (
        <div className='login'>
            <Form className='login-form' onSubmit={e => login(e)}>
                <Form.Group className="mb-3">
                    <InputGroup>
                        <InputGroup.Text><img src="https://img.icons8.com/ios-glyphs/30/737373/guest-male.png" alt='img-user' />
                        </InputGroup.Text>
                        <Form.Control
                            id="inlineFormInputGroupUsername"
                            placeholder="Username"
                            name='username'
                            type='text'
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <InputGroup>
                        <InputGroup.Text><img src="https://img.icons8.com/ios-glyphs/30/737373/email.png" alt='img-email' /></InputGroup.Text>
                        <Form.Control
                            id="inlineFormInputGroupEmail"
                            placeholder="Email"
                            name='email'
                            type='email'
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <InputGroup>
                        <InputGroup.Text><img src="https://img.icons8.com/ios-glyphs/30/737373/key-security.png" alt='img-pass' />
                        </InputGroup.Text>
                        <Form.Control
                            id="inlineFormInputGroupPassword"
                            placeholder="Password"
                            name='password'
                            type='password'
                        />
                    </InputGroup>
                </Form.Group>
                <div className='login-form-buttons'>
                    <Button type='submit'>Login</Button>
                    <div>
                        <span>Not account?</span>
                        <NavLink to="/sing-up">Sing up</NavLink>
                    </div>
                </div>
            </Form>

        </div>
    )
}

export default Login
