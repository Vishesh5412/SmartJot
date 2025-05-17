import noteContext from "./NoteContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect , useCallback} from "react";
const NoteState = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  function handleUserLogin(bool) {
    setIsLoggedIn(bool);
  }
  const [updatedNote, setUpdatedNote] = useState(); //note to be updated
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState([]);

  //for updated note
  const [updatedNoteTitle, setUpdatedNoteTitle] = useState("");
  const [updatedNoteDescription, setUpdatedNoteDescription] = useState("");
  const [updatedNoteCategory, setUpdatedNoteCategory] = useState("");

  const API = process.env.REACT_APP_API_URL;

  
  const fetchNotes = useCallback(async () => {
    try {
      const response = await fetch(`${API}/api/Notes/fetchnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setNotes(data.notes);
      if (!response.ok) {
        const errorMessage = data.message || "Unable to fetch notes";
        if (errorMessage === data.message) {
          navigate("/");
        }
        return;
      }
    } catch (err) {
      console.log("Unable to fetch notes", err.message);
    }
  }, [API , navigate]);
  useEffect(() => {
    if (location.pathname === "/Home") {
      fetchNotes();
    }
}, [location, fetchNotes]);  
  const fetchNote = async (id) => {
    try {
      const response = await fetch(`${API}/api/Notes/fetchnote/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        return;
      }
      // console.log(data);
      setUpdatedNote(data.note);
      setUpdatedNoteTitle(data.note.title);
      setUpdatedNoteDescription(data.note.description);
      setUpdatedNoteCategory(data.note.category);
    } catch (err) {
      console.log("Unable to fetch note", err.message);
    }
  };

  const handleUpdateLogic = (e) => {
    e.preventDefault();
    UpdateNote(
      updatedNote._id,
      updatedNoteTitle,
      updatedNoteDescription,
      updatedNoteCategory
    );
  };

  const UpdateNote = async (
    id,
    updatedNoteTitle,
    updatedNoteDescription,
    updatedNoteCategory
  ) => {
    try {
      const response = await fetch(`${API}/api/Notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: updatedNoteTitle,
          description: updatedNoteDescription,
          category: updatedNoteCategory,
        }),
        credentials: "include", //without this addition and deletion of cookie  not possible
      });
      const data = await response.json();
      if (!response.ok) {
        const errorMessage = data.message || "Unable to update note";
        props.showAlert("danger", "Error", errorMessage); // Show the error alert
        return;
      }
      navigate("/Home");
      props.showAlert("success", "Success", "Note Updated"); // Show the error alert
      setUpdatedNote("");
      setUpdatedNoteTitle("");
      setUpdatedNoteCategory("");
      setUpdatedNoteDescription("");
    } catch (err) {
      console.log("unable to update note", err.message);
    }
  };

  const handleAddLogic = (e) => {
    e.preventDefault();
    addNote(title, description, category);
  };

  const addNote = async (title, description, category) => {
    try {
      const response = await fetch(`${API}/api/Notes/createnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, category }),
        credentials: "include", //without this addition and deletion of cookie  not possible
      });
      const data = await response.json();
      if (!response.ok) {
        const errorMessage = data.message || "Unable to create note";
        props.showAlert("danger", "Error", errorMessage); // Show the error alert
        return;
      }
      setNotes([...notes, data.note]);
      props.showAlert("success", "Success", "Note created"); // Show the error alert
      setTitle("");
      setDescription("");
      setCategory("General");
    } catch (err) {
      console.log("unable to create note", err.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${API}/api/Notes/deletenote/${id}`, {
        method: "DELETE",
        credentials: "include", //without this addition and deletion of cookie not possible
      });
      const data = await response.json();
      if (!response.ok) {
        const errorMessage = data.message || "Unable to delete note";
        props.showAlert("danger", "Error", errorMessage); // Show the error alert
        if (errorMessage === data.message) {
          navigate("/");
        }
        return;
      }
      await fetchNotes();
      props.showAlert("success", "Success", "Note deleted ."); // Show the error alert
    } catch (err) {
      console.log("Unable to delete note", err.message);
    }
  };

  return (
    <noteContext.Provider
      value={{
        fetchNote,
        handleUpdateLogic,
        isLoggedIn,
        handleUserLogin,
        notes,
        setNotes,
        handleAddLogic,
        deleteNote,
        updatedNote,
        updatedNoteTitle,
        setUpdatedNoteTitle,
        updatedNoteDescription,
        setUpdatedNoteDescription,
        updatedNoteCategory,
        setUpdatedNoteCategory,
        title,
        setTitle,
        description,
        setDescription,
        category,
        setCategory,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
