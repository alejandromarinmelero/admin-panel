import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Button, Col, Form, FormLabel } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { NewContext } from '../../Context/Context'
import './style.scss'

const EditProfile = () => {

  const { user, editProfile, deleteAccount } = useContext(NewContext);
  const [num1] = useState(Math.floor(Math.random() * 11));
  const [num2] = useState(Math.floor(Math.random() * 11));
  const [result] = useState(num1 + num2);

  return (
    <div className='edit-profile'>
      <h1 className='edit-profile-header'>Edit profile</h1>
      <Form className='edit-profile-form' onSubmit={e => {
        e.preventDefault();
        if (parseInt(e.target.childNodes[4].childNodes[1].value) === result) {
          editProfile(e)
        } else {
          Swal.fire({
            title: 'El resultado de la suma erróneo',
            text: `Vuelve a intentarlo`,
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok!'
          })
        }
      }}>
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
          <FormLabel>Address</FormLabel>
          <Form.Control type='text' placeholder="Enter your address: C/ 1234 Main St" name='address' />
        </Form.Group>

        <div className="form-sec-block">
          <Form.Group as={Col} controlId="formGridCity">
            <FormLabel>City</FormLabel>
            <Form.Control type='text' placeholder="Enter your city" name='city' />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCountry">
            <FormLabel>Country</FormLabel>
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

        <div className='sum'>
          <Form.Label>{num1} + {num2}</Form.Label>
          <Form.Control type='text' name='sum'></Form.Control>
        </div>

        <div className='edit-profile-form-buttons'>
          <Button type="submit">Edit profile</Button>
          <Button>Back</Button>
        </div>
      </Form>

      <Button className='delete-account' onClick={() => { deleteAccount(user.username, user._id) }}>Delete account</Button>

    </div>
  )
}

export default EditProfile
