import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  })
  const handelClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title:"", description: "",tag: "",})
    props.showAlert("Added Successfully","success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
            
  return (
    <div>
      <div className="container my-2 p-3 mb-2 bg-info text-dark rounded-5">
        <h2>Write your note here</h2>
        <form className="my-2">
          <div className="form-group my-2">
            <label htmlFor="title">Title</label>
            <input value={note.title}
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              placeholder="Enter Title"
              onChange={onChange}
              minLength={4} required
        
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="description">Description</label>
            <input value={note.description}
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder="Enter Description "
              onChange={onChange}
              minLength={4}  required
             
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="tag">Tag</label>
            <input value={note.tag}
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              placeholder="Enter Tag"
              onChange={onChange}
              minLength={4}  required
             
            />
          </div>

          <button
          disabled={note.title.length<4 || note.description.length<4}
            type="submit"
            className="btn btn-primary"
            onClick={handelClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
