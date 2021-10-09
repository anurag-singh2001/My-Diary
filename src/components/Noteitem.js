import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';
const Noteitem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className ="card-body">
                <h5 className ="card-title"> {note.title}</h5>
                <p className ="card-text">{note.description}</p>
                <i className="fas fa-trash mx-3"onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Successfully","success");}}></i>
                <i className="fas fa-clipboard mx-3"onClick={()=>{updateNote(note);props.showAlert("Updated Successfully ","success");}}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem;