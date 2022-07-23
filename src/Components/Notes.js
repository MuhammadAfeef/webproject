import React, { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../Context/notes/noteContext";
import {Link, useNavigate} from 'react-router-dom';
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";

function Notes(props) {
  const context = useContext(noteContext);
  const navigate = useNavigate()
  const { notes, getNotes, editNote } = context;

  const [searchNotes, setSearchNotes] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
  }, [searchNotes])

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id : "" ,etitle :"", edescription : "",etag : "" })

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id : currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
    
  };
  const handleClick = (e) =>{
    editNote(note.id , note.etitle, note.edescription , note.etag)
    refClose.current.click();
    props.showAlert('Updated' , 'success')
}
const onChange = (e) =>{
    setNote({...note ,[e.target.name]:e.target.value })
}

const handleChange = (e) => {
  let value = e.target.value.toString().toLowerCase()
  if (value.length >= 1) {
    let newNotes = notes.filter(note => {
      if (note.title.toLowerCase().startsWith(value)){
       return note
      }  
    })
    setIsSearching(true)
    setSearchNotes(newNotes)
  } else {
    setIsSearching(false)
    setSearchNotes([])
  }
}

  return (
    <>
      <AddNote showAlert = {props.showAlert} />
      {/* <div className="search">
      <input className="searchInput" placeholder="Search a medicine" onChange={handleChange} />
      <i className="fa-solid fa-magnifying-glass mx-2"></i>
      </div> */}
      <div className="searchBox v-class-resp">
            <input type="text" name="search" className="search-txt" onChange={handleChange} placeholder="Search a medicine"/>
            <Link to="#" className="search-btn">
                <i className="fa-solid fa-magnifying-glass"></i>
            </Link>
        </div>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
         Medicine</button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Your Medicine
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"> </button>
            </div>
            <div className="modal-body">
          <form className="container my-3">
              <div className="mb-3">
              <label htmlFor="title" className="form-label">Medicine Title</label>
              <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
              </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label"> Description of Medicine</label>
              <input type="text" className="form-control" id="edescription" name="edescription"value={note.edescription} onChange={onChange} minLength={5} required />
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label"> Tag </label>
              <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
            </div>
          </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal"> Close </button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary"> Update Medicine </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Medicines</h2>
        <div className="container mx-3">
        {notes.length === 0 && 'No notes to display'}
        </div>
        {isSearching ? 
        searchNotes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          );
        })
        : notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
