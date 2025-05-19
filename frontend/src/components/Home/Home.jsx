import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import noteContext from "../../context/notes/NoteContext";
import "./Home.css";
function Home(props) {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const {
    notes,
    handleUserLogin,
    handleAddLogic,
    fetchNote,
    deleteNote,
    title,
    setTitle,
    description,
    setDescription,
    category,
    setCategory,
    setLoading
  } = context; //isse notes or setnotes direct access kre ja skte hai without using context.notes or contet.setNotes
  // const  userName = localStorage.getItem('name') || '';
  const API = process.env.REACT_APP_API_URL;

  const handleLogout = async (e) => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/api/User/Logout`, {
        method: "GET",
        credentials: "include", //without this deletion and setting of cookie not possible
      });
      if (!response.ok) {
        setLoading(false);
        navigate("/Home");
        return;
      }
      localStorage.removeItem("name");
      navigate("/");
      handleUserLogin();
      setLoading(false);
      props.showAlert("success", "Success", "User logout successfully");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="container">
        <button
          type="button"
          className="btn btn-danger lgt-btn"
          onClick={handleLogout}
        >
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
        <div className="h-tp">
          <p>👋 Hello</p>
        </div>
        <form onSubmit={handleAddLogic}>
          <div className="form-group col-md-3  mb-1">
            <input
              type="text"
              className="form-control"
              value={title}
              name="title"
              id="inputEmail4"
              placeholder="Title"
              spellCheck="false"
              required
              onChange={(e) => setTitle(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="form-group mb-1">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              name="description"
              value={description}
              rows="6"
              placeholder="Description.."
              spellCheck="false"
              required
              onChange={(e) => setDescription(e.target.value)}
              autoComplete="off"
            ></textarea>
          </div>

          <select
            className="form-control form-select col-md-2 mb-2"
            value={category}
            name="category"
            aria-label="Default select example"
            onChange={(e) => setCategory(e.target.value)} // Update category when selected
          >
            <option value="General">🗂️ General</option>
            <option value="Work">💼 Work</option>
            <option value="Study">📚 Study</option>
            <option value="Ideas">💡 Ideas</option>
            <option value="To-Do">✅ To-Do</option>
            <option value="Personal">🏡 Personal</option>
          </select>

          <button type="submit" className="btn btn-primary mb-5">
            Submit
          </button>
        </form>

        <div className="n-list">
          <p className="h-list-hing">Your notes</p>
          <div className="ntx-cnt">
            {notes &&
              notes.map((note) => {
                return (
                  <div className="nts-div" key={note._id}>
                    <p className="note-title l-text">{note.title}</p>
                    <p className="note-category">{note.category}</p>
                    <p className="note-ptl-desn m-text">{note.description}</p>
                    <Link to={`/edit/${note._id}`}>
                      <i
                        className="fa-solid fa-pen-to-square fa-lg"
                        onClick={() => {
                          fetchNote(note._id);
                        }}
                      ></i>
                    </Link>
                    <i
                      className="fa-solid fa-trash fa-lg"
                      onClick={() => deleteNote(note._id)}
                    ></i>
                    <p className="nts-time">
                      {note.date
                        ? `${new Date(Number(note.date)).toLocaleString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}`
                        : "Created date unavailable"}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
