import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NewContext } from '../../Context/Context';
import './style.scss'

const Note = () => {

    const { id } = useParams();

    const { user } = useContext(NewContext);

    const [note, setNote] = useState({});

    useEffect(() => {
        let notes = user.notes;
        try {
            const searchNote = notes.find(note => note.id === id);
            if (searchNote) {
                setNote(searchNote);
            }
        } catch (error) {
            console.log(error);
        }
    }, [id, user.notes])

    return (
        <div className='note'>
            <div className='blog-img'></div>
            <div className='title-and-date'>
                <h1>{note.title}</h1>
                <span>Última modificación: {note.modificationDate}</span>
            </div>
            <p>{note.note}</p>
        </div>
    )
}

export default Note
