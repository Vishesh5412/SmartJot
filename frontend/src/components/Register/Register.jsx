import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
function Register(props) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const API = process.env.REACT_APP_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== rePassword) {
        props.showAlert("danger", "Error", "Password not matching"); // Show the error alert
        setRePassword("");
        return;
      }
      const response = await fetch(`${API}/api/User/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
        credentials: "include", //without this addition and deletion of key not possible
      });
      const data = await response.json();
      if (!response.ok) {
        // Show error message from the backend response
        const errorMessage =
          data.message || "Registration failed. Please try again.";
        props.showAlert("danger", "Error", errorMessage); // Show the error alert
        navigate("/");
        return; // Do not continue to redirect
      }
      localStorage.setItem("name", data.user.name);
      navigate("/Home");
      props.showAlert("success", "Success", "User registered successfully");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="cont-p">
        <div className="s-cont s-cont-1">
          <h2>
            Welcome to <span id="stl-font">𝚂𝚖𝚊𝚛𝚝𝙹𝚘𝚝</span>
          </h2>
          <h3>Create your account</h3> <br />
          <form
            action="/user/register"
            method="post"
            className="inf-form"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Username"
              name="name"
              className="c-vis"
              minLength="3"
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              spellCheck="false"
              required
            />{" "}
            <br />
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="c-vis"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              spellCheck="false"
              required
            />{" "}
            <br />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="c-vis"
              minLength="7"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              spellCheck="false"
              required
            />{" "}
            <br />
            <input
              type="password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              placeholder="Confirm Password"
              name="re-password"
              className="c-vis"
              autoComplete="new-password"
              spellCheck="false"
              required
            />{" "}
            <br />
            <input
              type="submit"
              name="sbt-btn"
              className="sbt-btn"
              value="Create My Account"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
