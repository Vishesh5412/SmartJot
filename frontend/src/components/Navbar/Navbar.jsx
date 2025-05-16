import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Add this CSS to your stylesheet (or create a CSS file for your Navbar)
import './Navbar.css'

function Navbar() {
  const location = useLocation();
  const [active, setActive] = useState("/");
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const closeSidebar = () => setShowSidebar(false);

  return (
    <>
      

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleSidebar}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link className="navbar-brand fs-2 fw-bold ms-2" to="/">
            𝚂𝚖𝚊𝚛𝚝𝙹𝚘𝚝
          </Link>

          <div className="collapse navbar-collapse d-none d-lg-flex" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${active === "/" ? "active" : ""}`} to="/">
                  <i className="fa-solid fa-house fa-lg"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${active === "/about" ? "active" : ""}`} to="/about">
                  <i className="fas fa-user fa-lg ms-2"></i>
                </Link>
              </li>
            </ul>
            <Link to="/">
              <button
                type="button"
                className={`btn btn-dark ms-2 ${active === "/" ? "active" : ""}`}
              >
                Register
              </button>
            </Link>
            <Link to="/login">
              <button
                type="button"
                className={`btn btn-dark ms-2 ${active === "/login" ? "active" : ""}`}
              >
                Login
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Custom offcanvas with smooth transitions */}
      <div 
        className={`offcanvas-custom offcanvas offcanvas-start ${showSidebar ? 'show' : ''}`}
        tabIndex="-1"
      >
        <div className="offcanvas-header">
          <h4 className="offcanvas-title">SmartJot Menu</h4>
          <button
            type="button"
            className="btn-close"
            onClick={closeSidebar}
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
        <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link ${active === "/" ? "active" : ""}`} to="/" onClick={closeSidebar}>
                <i className="fa-solid fa-house me-2"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${active === "/about" ? "active" : ""}`} to="/about" onClick={closeSidebar}>
                <i className="fas fa-user me-2"></i> About
              </Link>
            </li>
            <li className="nav-item mt-3">
              <Link to="/" className={`btn btn-dark w-100 mb-2 ${active === "/" ? "active" : ""}`} onClick={closeSidebar}>
                Register
              </Link>
              <Link to="/login" className={`btn btn-dark w-100 ${active === "/login" ? "active" : ""}`} onClick={closeSidebar}>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Backdrop with fade effect */}
      <div 
        className={`offcanvas-backdrop ${showSidebar ? 'show' : ''}`}
        onClick={closeSidebar}
      />
    </>
  );
}

export default Navbar;