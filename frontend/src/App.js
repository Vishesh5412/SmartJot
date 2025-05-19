import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import NoteState from "./context/notes/NoteState.js";
import UserState from './context/user/UserState.js';
import Alert from "./components/Alert/Alert.js";
import Edit from "./components/Home/Edit.jsx";
import Loader from "./components/Loader/Loader.jsx"
import { Routes, Route } from "react-router-dom"; // Removed BrowserRouter

function App() {
  const [alert, setAlert] = useState({ setClass: null, type: null, message: null });

  function showAlert(setClass, type, message) {
    setAlert({ setClass, type, message });
    setTimeout(() => {
      setAlert({ setClass: null, type: null, message: null });
    }, 1500);
  }

  return (

    <UserState>
      <NoteState showAlert={showAlert}>
        <Navbar />
        <Alert alert={alert} />
        <Loader />
        <Routes>
          <Route path="/" element={<Register showAlert={showAlert} />} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/Home" element={<Home showAlert={showAlert} />} />
          <Route path="/edit/:id" element={<Edit showAlert={showAlert} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </NoteState>
    </UserState>
  );
}

export default App;
