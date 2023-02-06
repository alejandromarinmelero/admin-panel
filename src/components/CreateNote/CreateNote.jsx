import React from 'react'
import './style.scss'
import { Form, FormLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Peticion } from '../../utils/peticion';
import Swal from 'sweetalert2'

const CreateNote = ({ show, handleClose, user, checkNotes, setCheckNotes }) => {

    const addNote = (e) => {
        e.preventDefault()

        const form = e.target;

        const formData = new FormData(form);

        let note = {}

        for (const [name, value] of formData) {
            note[name] = value
        }

        Swal.fire({
            title: 'You are going to create the next note:',
            text: `Title: ${form.title.value}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, create it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await Peticion(`http://localhost:3900/api/notes/crear-notas/${user._id}`, 'PUT', note);
                    if (data) {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 2500
                        })
                        Toast.fire({
                            icon: 'success',
                            title: 'Your post has been created!!'
                        })
                        setCheckNotes(checkNotes + 1)
                        handleClose()
                    }
                } catch (error) {
                    console.log(error);
                    throw new Error('no se pudo realizar la petición')
                }
            }
        })
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Add note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={event => (addNote(event))}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                            name='title'
                            type="text"
                            placeholder="Introduce your title"
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <FormLabel>Note</FormLabel>
                        <Form.Control
                            as="textarea"
                            name='note'
                            rows={3}
                            placeholder="Introduce your note" />
                    </Form.Group>
                    <Modal.Footer>
                        <Button onClick={handleClose}>
                            Close
                        </Button>
                        <Button type='submit'>
                            Add note
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>

        </Modal>
    )
}

export default CreateNote
