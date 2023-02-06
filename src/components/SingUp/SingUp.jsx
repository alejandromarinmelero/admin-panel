import React from 'react'
import './style.scss'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { Peticion } from '../../utils/peticion';
import Swal from 'sweetalert2';
import { FormLabel } from 'react-bootstrap';

const SingUp = () => {

    const Navigate = useNavigate()

    const toLogin = () => {
        Navigate('/')
    }

    const addUser = (e) => {
        e.preventDefault()

        const form = e.target;

        const formData = new FormData(form);

        let objetoCompleto = {}

        for (const [name, value] of formData) {
            objetoCompleto[name] = value
        }

        if (!form.check.checked) {
            Swal.fire({
                icon: 'error',
                title: 'Please, confirm the form',
            })
        } else {
            Swal.fire({
                title: 'You are going to create an account:',
                text: `Username: ${form.name.value}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, create it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const { data } = await Peticion('http://localhost:3900/api/users/crear-usuario', 'POST', objetoCompleto);
                        if (data.code === '01') {
                            console.log(data);
                            Swal.fire({
                                icon: 'error',
                                title: "Oops...",
                                text: `${data.message}`,
                            })
                        } else if (data.code === '02') {
                            console.log(data);
                            Swal.fire({
                                icon: 'error',
                                title: "Oops...",
                                text: `${data.message}`,
                            })
                        } else {
                            Swal.fire({
                                icon: 'success',
                                title: `${data.message}`,
                            })
                        }
                    } catch (error) {
                        console.log(`Se produjo un error: ${error}`);
                        throw new Error('no se pudo realizar la petición')
                    }

                }
            })
        }
    }

    return (
        <div className='sing-up'>
            <Form className='sing-up-form' onSubmit={event => { addUser(event) }}>
                <div className='form-first-block'>
                    <Form.Group as={Col} controlId="formGridName">
                        <FormLabel>Name</FormLabel>
                        <Form.Control type="text" placeholder="Enter you name" name='name' />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridUsername">
                        <FormLabel>Username</FormLabel>
                        <Form.Control type="text" placeholder="Enter you nick name" name='username' />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                        <FormLabel>Email</FormLabel>
                        <Form.Control type="email" placeholder="Enter your Email" name='email' />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <FormLabel>Password</FormLabel>
                        <Form.Control type="password" placeholder="Enter your password" name='password' />
                    </Form.Group>
                </div>
                <hr></hr>
                <Form.Group className="mb-3" as={Col} controlId="formGridAddress1">
                    <FormLabel>Address <span>optional</span></FormLabel>
                    <Form.Control type='text' placeholder="Enter your address: C/ 1234 Main St" name='address' />
                </Form.Group>

                <div className="form-sec-block">
                    <Form.Group as={Col} controlId="formGridCity">
                        <FormLabel>City <span>optional</span></FormLabel>
                        <Form.Control type='text' placeholder="Enter your city" name='city' />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCountry">
                        <FormLabel>Country <span>optional</span></FormLabel>
                        <Form.Select defaultValue='Country' name='country'>
                            <option disabled={true}>Country</option>
                            <option>Afghanistan</option>
                            <option>Albania</option>
                            <option>Argentina</option>
                            <option>Brazil</option>
                            <option>Cameroon</option>
                            <option>Chile</option>
                            <option>China</option>
                            <option>Spain</option>
                        </Form.Select>
                    </Form.Group>
                </div>

                <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Confirm form" name='check' />
                </Form.Group>
                <div className='sing-up-form-buttons'>
                    <Button type="submit">Create account</Button>
                    <Button onClick={toLogin}>Back</Button>
                </div>
            </Form>
        </div>
    )
}

export default SingUp
