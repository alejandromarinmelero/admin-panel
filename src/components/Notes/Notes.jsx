import React from 'react'
import './style.scss'
import Table from 'react-bootstrap/Table';
import { Form } from 'react-bootstrap';
import CreateNote from '../CreateNote/CreateNote';
import EditNote from '../EditNote/EditNote';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { NewContext } from '../../Context/Context';

const Notes = () => {

    const { user, notesFound, findNote, removeNote, deleteAll, noteToEdit, showAddNote, showEditNote, handleAddNote, handleEditNote, checkNotes, setCheckNotes } = useContext(NewContext);

    return (
        <>
            <div className='notes'>
                <h1>Notes</h1>
                <div className='notes-controls'>
                    <div className='add-note' onClick={handleAddNote}>
                        <img src='https://img.icons8.com/office/16/null/plus-math.png' alt='add'></img>
                        <p>Add note</p>
                    </div>
                    <div className='delete-all' onClick={deleteAll}>
                        <img id="image" className='remove-item' src="https://img.icons8.com/parakeet/48/000000/trash.png" alt="Icono cesta de la basura, eliminar"></img>
                        <p>Delete all</p>
                    </div>
                    <CreateNote handleClose={handleAddNote} show={showAddNote} user={user} checkNotes={checkNotes} setCheckNotes={setCheckNotes} />
                    <div className='search-container'>
                        <Form>
                            <Form.Control
                                type="search"
                                placeholder="Search notes"
                                className="me-2"
                                aria-label="Search"
                                onChange={e => findNote(e)}
                            />
                        </Form>
                    </div>
                </div>
                <Table className='notes-table' striped borderless responsive hover>
                    <thead>
                        <tr className='note-titles'>
                            <th>Note</th>
                            <th>Title</th>
                            <th>Creation date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notesFound.length > 0 &&
                            notesFound.map(note => {
                                return <tr key={note.id} className='note-elements'>
                                    <td>{notesFound.indexOf(note) + 1}</td>
                                    <td>
                                        <div className='td-2'>
                                            <p>{note.title}</p>
                                            <Link to={`/admin/note/${note.id}`}>Ver</Link>
                                        </div>
                                    </td>
                                    <td>{note.date}</td>
                                    <td>
                                        <img className='edit-item' src="https://img.icons8.com/color/48/null/edit-property.png" alt='edit-note' onClick={() => handleEditNote(note)} />
                                    </td>
                                    <td>
                                        <img id="image" className='remove-item' src="https://img.icons8.com/parakeet/48/000000/trash.png" alt="Icono cesta de la basura, eliminar" onClick={() => removeNote(note.id)}></img>
                                    </td>
                                </tr>
                            })
                        }
                        <EditNote handleClose={handleEditNote} show={showEditNote} note={noteToEdit} user={user} checkNotes={checkNotes} setCheckNotes={setCheckNotes} />
                    </tbody>
                </Table>
                <Table className='notes-table-responsive' striped borderless responsive hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notesFound.map(note => {
                            return <tr key={note.id} className='note-elements'>
                                <td><Link to={`/admin/note/${note.id}`}>{note.title}</Link></td>
                                <td>
                                    <img className='edit-item' src="https://img.icons8.com/color/48/null/edit-property.png" alt='edit-note' onClick={() => handleEditNote(note)} />
                                </td>
                                <td>
                                    <img id="image" className='remove-item' src="https://img.icons8.com/parakeet/48/000000/trash.png" alt="Icono cesta de la basura, eliminar" onClick={() => removeNote(note.id)}></img>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                {notesFound.length === 0 && <p>Aun no hay notas :(</p>}
            </div>
        </>
    )
}

export default Notes
