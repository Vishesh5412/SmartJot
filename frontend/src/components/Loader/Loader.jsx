import React from 'react';
import { useContext } from "react";
import noteContext from "../../context/notes/NoteContext";
import './Loader.css'; // Import the CSS file

const Loader = () => {
  const context = useContext(noteContext);
  const {loading}= context;
  if (!loading){
    return null;
  }
  return (
    <div className="loader-overlay">
      <div className="loader">
        <div className="dots-container">
          <div className="dot dot-blue"></div>
          <div className="dot dot-red"></div>
          <div className="dot dot-yellow"></div>
          <div className="dot dot-green"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;