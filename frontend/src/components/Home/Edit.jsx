import React, { useContext  } from "react";
import noteContext from "../../context/notes/NoteContext";

import "./Home.css";
const Edit = () => {
  const context = useContext(noteContext);
  const {
    handleUpdateLogic,
    updatedNote,
    updatedNoteTitle,
    setUpdatedNoteTitle,
    updatedNoteDescription,
    setUpdatedNoteDescription,
    updatedNoteCategory,
    setUpdatedNoteCategory,
  } = context;

  return (
    <>
      {updatedNote && (
        <div className="container">
          <div className="hdng">
            <p>Edit note</p>
          </div>

          <form onSubmit={handleUpdateLogic}>
            <div className="form-group col-md-3  mb-1">
              <input
                type="text"
                className="form-control"
                name="title"
                value={updatedNoteTitle}
                id="inputEmail4"
                placeholder="Title"
                spellCheck="false"
                required
                onChange={(e) => setUpdatedNoteTitle(e.target.value)}
              />
            </div>

            <div className="form-group mb-1">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                value={updatedNoteDescription}
                name="description"
                rows="6"
                placeholder="Description.."
                spellCheck="false"
                required
                onChange={(e) => setUpdatedNoteDescription(e.target.value)}
              ></textarea>
            </div>

            <select
              className="form-control form-select col-md-2 mb-2"
              value={updatedNoteCategory}
              name="category"
              aria-label="Default select example"
              onChange={(e) => setUpdatedNoteCategory(e.target.value)} // Update category when selected
            >
               <option value="General">🗂️ General</option>
            <option value="Work">💼 Work</option>
            <option value="Study">📚 Study</option>
            <option value="Ideas">💡 Ideas</option>
            <option value="To-Do">✅ To-Do</option>
            <option value="Personal">🏡 Personal</option>
            </select>

            <button type="submit" className="btn btn-primary mb-5">
              Update
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Edit;
