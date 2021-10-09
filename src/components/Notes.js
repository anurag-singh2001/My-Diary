import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote'
import { useHistory } from 'react-router';
export const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes,editNote } = context;
    const history = useHistory();
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
            history.push('/login')
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
      
    }

    const handleClick = (e)=>{
        editNote(note.id, note.etitle, note.edescription, note.etag)
        console.log("Updating note....",note)
        refClose.current.click();
        props.showAlert("Updated Successfully ","success")
       
    }
    const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})

    }
    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title </label>
                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp"  onChange={onChange} value={note.etitle} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name="edescription"  onChange={onChange} value={note.edescription} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag"  onChange={onChange} value={note.etag} minLength={5} required/>
                </div>
            </form>
                        </div>
                        <div className="modal-footer">
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Edit Note </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>My Notes</h2>
                <div className="container mx-3">
                    {notes.length===0 && 'No Notes to Display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />
                })}

            </div>
        </>
    )
}

export default Notes